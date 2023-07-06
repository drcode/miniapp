(ns miniapp.miniapp
  (:require [org.httpkit.server :as hs]
            [clojure.string :as st]
            [fbc-utils.core :as ut]
            [clj-pid.core :as pid]
            [fbc-utils.debug]
            [clojure.java.io :as io]
            [wkok.openai-clojure.api :as oa]
            [markdown.core :as md]
            [ring.util.codec :as cd]))

(def state (atom {:emacs-modified false
                  :emacs-text     nil
                  :chatgpt-query  ""}))

(def code-page (slurp "code_page.html"))

(def chatgpt-page (slurp "chatgpt_page.html"))

(def openai-api-key (:openai-api-key (read-string (slurp "config.edn"))))

(defn chatgpt [prompt
               {:keys [system-prompt
                       stop-seqs]
                :as   options}]
  (get-in (oa/create-chat-completion (cond-> {:model    "gpt-4"
                                              :messages (vec (concat (when system-prompt
                                                                       [{:role    "system"
                                                                         :content system-prompt}])
                                                                     [{:role    "user"
                                                                       :content prompt}]))}
                                       stop-seqs (assoc :stop stop-seqs))
                                     {:api-key openai-api-key})
          [:choices 0 :message :content]))

(defn request-handler [{:keys [uri
                               body
                               server-name
                               request-method]
                        :as   req}]
  (case uri
    "/fereofjhh"        (do (swap! state
                                   (fn [{:keys [emacs-modified
                                                emacs-text]
                                         :as   state}]
                                     (cond-> state
                                       (not emacs-modified) (assoc :emacs-text (slurp body)))))
                            {:status 200
                             :body   "\"success\""})
    "/chickenhandstand" {:status 200
                         :body   (let [{:keys [emacs-text]
                                        :as   state} @state]
                                   (st/replace code-page "{}" (or emacs-text "")))}
    "/mulepantry"       {:status 200
                         :body   (let [chatgpt-query (if (= request-method :get)
                                                       (:chatgpt-query @state)
                                                       ((cd/form-decode (slurp body)) "query"))]
                                   (swap! state assoc :chatgpt-query chatgpt-query)
                                   (-> chatgpt-page
                                       (st/replace "{query}" chatgpt-query)
                                       (st/replace "{answer}" (if (= chatgpt-query "")
                                                                ""
                                                                (md/md-to-html-string (chatgpt chatgpt-query {}))))))}
    "/asdfsdidii"       {:status 200
                         :body   (:emacs-text @state)}
    "/greet"            {:status 200
                         :body   (str "Hello server " (pid/current))}
    "/supertight.woff" (let [font-file   (io/file "supertight.woff")
                             font-stream (io/input-stream font-file)]
                         {:status  200
                          :headers {"Content-Type" "application/font-woff"}
                          :body    font-stream})
    "/favicon.ico"      {:status 200}
    {:status 404}))

(defonce server (atom nil))

(defn stop-server []
  (swap! server
         (fn [server]
           (when server
             (println "stopped server.")
             (server))
           nil)))

(defn start-server []
  (stop-server)
  (reset! server (hs/run-server request-handler {:port 2568}))
  (println "server started"))


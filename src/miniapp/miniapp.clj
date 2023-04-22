(ns miniapp.miniapp
  (:require [org.httpkit.server :as hs]
            [clojure.string :as st]
            [fbc-utils.core :as ut]
            [clj-pid.core :as pid]
            [fbc-utils.debug]))

(def state (atom {:emacs-modified false
                  :emacs-text     nil}))

(def code-page (slurp "code_page_arrows.js"))

(defn request-handler [{:keys [uri
                               body
                               server-name]
                        :as   req}]
  (case uri
    "/fereofjhh"   (do (swap! state
                              (fn [{:keys [emacs-modified
                                           emacs-text]
                                    :as   state}]
                                (cond-> state
                                  (not emacs-modified) (assoc :emacs-text (slurp body)))))
                       {:status 200
                        :body   "\"success\""})
    "/chickenhandstand"  {:status 200
                          :body   (let [{:keys [emacs-text]
                                         :as   state} @state]
                                    (st/replace code-page "{}" (or emacs-text "")))}
    "/asdfsdidii"  {:status 200
                    :body   (:emacs-text @state)}
    "/greet"       {:status 200
                    :body   (str "Hello server " (pid/current))}
    "/favicon.ico" {:status 200}
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


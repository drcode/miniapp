(ns miniapp.launcher
  (:require [miniapp.miniapp :as ma]))

(ma/start-server)
(while true
  (Thread/sleep 20000))
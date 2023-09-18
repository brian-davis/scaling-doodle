import consumer from "channels/consumer";

consumer.subscriptions.create("UserAppearancesChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    // console.log("UserAppearancesChannel connected()");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    if (data.event === "appear" || data.event === "disappear") {
      // reset all elements (offline status)
      const user_statuses = document.getElementsByClassName("status_indicator");
      Array.from(user_statuses).forEach((status_element) => {
        status_element.classList.remove("text-green-500");
        status_element.classList.add("text-red-500");
      });

      // set all elements matching data ids as online
      const user_ids = data.user_ids;
      user_ids.forEach((user_id) => {
        console.log("user_id ", user_id);
        const dom_id = `status_user_${user_id}`;
        console.log("dom_id ", dom_id);
        const status_element = document.getElementById(dom_id);
        console.log("status_element ", status_element);
        status_element.classList.remove("text-red-500");
        status_element.classList.add("text-green-500");
      });
    }
  },
});

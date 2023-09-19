import { Controller } from "@hotwired/stimulus";
import consumer from "channels/consumer";

// Connects to data-controller="user-appearances"
export default class extends Controller {
  static classes = ["appeared", "disappeared"];
  static targets = ["status"];

  connect() {
    // console.log("user-appearances controller connect()");
    this.subscription = consumer.subscriptions.create(
      "UserAppearancesChannel",
      {
        connected: this.cableConnected.bind(this),
        disconnected: this.cableDisconnected.bind(this),
        received: this.cableReceived.bind(this),
      }
    );
  }

  disconnect() {
    if (this.subscription) {
      consumer.subscriptions.remove(this.subscription);
      // console.log("AppearancesChannel subscription removed");
    }
  }

  // Called when the subscription is ready for use on the server
  cableConnected() {
    // console.log("user-appearances controller cableConnected()");
  }

  // Called when the subscription has been terminated by the server
  cableDisconnected() {
    // console.log("user-appearances controller cableDisconnected()");
  }

  // Called when there's incoming data on the websocket for this channel
  cableReceived(data) {
    // console.log("user-appearances controller cableReceived(data)");
    // console.log("data: ", data);
    if (data.event === "appear" || data.event === "disappear") {
      // reset all
      this.statusTargets.forEach((element) => {
        element.classList.remove(this.appearedClass);
        element.classList.add(this.disappearedClass);
      });

      // reset all appeared
      data.user_ids.forEach((user_id) => {
        const element = this.statusTargets.find((target) => {
          return target.dataset.userId === user_id;
        });
        element.classList.remove(this.disappearedClass);
        element.classList.add(this.appearedClass);
      });
    }
  }
}

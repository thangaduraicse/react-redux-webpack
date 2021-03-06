import Routes from "./routes";

import "bootstrap/dist/css/bootstrap.css";
import "react-widgets/lib/scss/react-widgets.scss";
import "./SCSS/index.scss";

const rootElement = document.getElementById("root");

ReactDOM.render(<Routes />, rootElement);

if(module.hot) {
  /* eslint-disable no-console */
  const orgError = console.error;
  console.error = message => {
    if(message &&
        message.indexOf("You cannot change <Router routes>;") === "-1") {
      orgError.apply(console, [message]);
    }
  };
  /* eslint-enable no-console */
  module.hot.accept("./routes", () => {
    const NextApp = require("./routes").default;
    ReactDOM.render(<NextApp />, rootElement);
  });
}

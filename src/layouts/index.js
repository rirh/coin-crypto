import { Provider } from "mobx-react";
import styles from './index.css';
import Header from './header'
function BasicLayout(props) {
  return (
    <Provider >
      <div className={styles.wapper}>
        <Header {...props} ></Header>
        <div className={styles.contain} >
          {props.children}
        </div>

      </div>
    </Provider>
  );
}

export default BasicLayout;

import styles from './index.css';
import Header from './header'
function BasicLayout(props) {
  return (
      <div className={styles.wapper}>
        <Header {...props} ></Header>
        <div className={styles.contain} >
          {props.children}
        </div>

      </div>
  );
}

export default BasicLayout;

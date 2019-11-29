
import styles from './header.scss';
import Link from 'umi/link';

export default function (props) {
  let routers = props.route && props.route.routes || [];
  // if (routers[routers.length - 1]._title) routers.splice(routers.length - 1, 1);

  return (
    <div>
      <ul className={styles.header}>
        {
          routers.map(e => e.path && (
            <li className={styles.menu} key={e.path}>
              <Link to={e.path}>{e.name || e.path}</Link>
            </li>))
        }
      </ul>
    </div>
  );
}

import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const url =
  "http://www.strava.com/oauth/authorize?client_id=161522&response_type=code&redirect_uri=http://127.0.0.1:5173/auth/callback&approval_prompt=force&scope=read,activity:read_all&state=login";

const registerUrl =
  "http://www.strava.com/oauth/authorize?client_id=161522&response_type=code&redirect_uri=http://127.0.0.1:5173/auth/callback&approval_prompt=force&scope=read,activity:read_all&state=register";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.headline}>Sehnsucht</h1>
      <div className={styles.linksContainer}>
        <div className={styles.linkContainer}>
          <Link className={styles.link} to={url}>
            Login
          </Link>
          <ChevronRightIcon className={styles.chevron} />
        </div>
        <div className={styles.linkContainer}>
          <Link className={styles.link} to={registerUrl}>
            Register
          </Link>
          <ChevronRightIcon className={styles.chevron} />
        </div>
      </div>
    </div>
  );
}

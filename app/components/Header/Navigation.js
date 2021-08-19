import Link from "next/link";
import { IoCaretDown } from "react-icons/io5";
import ReactCountryFlag from "react-country-flag";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { logout } from "../../redux/actions/auth";
import COUNTRIES from "../../constants/countries";
import LoginIcon from "../../../public/images/svg/login.svg";
import LogoutIcon from "../../../public/images/svg/logout.svg";
import UserIcon from "../../../public/images/svg/user.svg";
import { formatValue } from "../../util/lib";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const { authenticated } = useSelector((state) => state.auth);

  return (
    <nav className="mainmenu__nav">
      <ul className="mainmenu">
        <li className="drop">
          <Link href="/vip/hanoi">
            <a>
              {t("game_types.vip.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            <li>
                <Link href='/vip/saigon'><a>{t("game_types.vip.saigon")}</a></Link>
            </li>
            <li>
                <Link href='/vip/hanoi'><a>{t("game_types.vip.hanoi")}</a></Link>
            </li>
            <li>
                <Link href='/vip/hochiminh'><a>{t("game_types.vip.hochiminh")}</a></Link>
            </li>
            {/* <li>
              <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
              <a>{t("coming_soon")}</a>
            </li> */}
          </ul>
        </li>
        <li className="drop">
          <Link href="/mega/one-minute">
            <a>
              {t("game_types.mega.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            <li>
                <Link href='/mega/one-minute'><a>{t("game_types.mega.one_minute")}</a></Link>
            </li>
            {/* <li>
                <Link href='/mega/one-second'><a>{t("game_types.mega.one_second")}</a></Link>
            </li> */}
            <li>
              <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
              <a>{t("coming_soon")}</a>
            </li>
          </ul>
        </li>
        <li className="drop">
          <Link href="/">
            <a>
              {t("game_types.superspeed.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            <li>
              <Link href='/superspeed/superspeed'><a>super speed</a></Link>
            </li>
              {/* <li>
                  <Link href='/home-two'><a>Hồ Chí Minh VIP</a></Link>
              </li> */}
            {/* <li>
              <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
              <a>{t("coming_soon")}</a>
            </li> */}
          </ul>
        </li>
        <li className="drop">
          <Link href="/">
            <a>
              {t("game_types.south.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            {/* <li>
              <Link href='/south/'><a>Hà Nội VIP</a></Link>
            </li> */}
            {/* <li>
              <Link href='/home-two'><a>Hồ Chí Minh VIP</a></Link>
            </li> */}
            <li>
              <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
              <a>{t("coming_soon")}</a>
            </li>
          </ul>
        </li>
        <li className="drop">
          <Link href="/">
            <a>
              {t("game_types.central.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            {/* <li>
                <Link href='/home-one'><a>Hà Nội VIP</a></Link>
              </li>
              <li>
                <Link href='/home-two'><a>Hồ Chí Minh VIP</a></Link>
              </li> */}
            <li>
              <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
              <a>{t("coming_soon")}</a>
            </li>
          </ul>
        </li>
        <li className="drop">
          <Link href="/northern/northern-lottery">
            <a>
              {t("game_types.northern.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            <li>
              <Link href="/northern/northern-lottery">
                <a>{t("game_types.northern.northern")}</a>
              </Link>
            </li>
            <li>
              <Link href="/northern/jackpot">
                <a>{t("game_types.northern.jackpot")}</a>
              </Link>
              {/* <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
              <a>{t("coming_soon")}</a> */}
            </li>
            <li>
              {/* <Link href='/northern/scratch-lottery'><a>{t("game_types.northern.scratch")}</a></Link> */}
              <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
              <a>{t("coming_soon")}</a>
            </li>
          </ul>
        </li>
        <li className="drop">
          {COUNTRIES.map((element, index) => {
            if (element.code === i18n.language) {
              return (
                <ReactCountryFlag
                  countryCode={element.iconName}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                  title={element.iconName}
                  key={`SELECTED_LANGUAGE_ENTRY_${index}`}
                />
              );
            }
            return null;
          })}
          <IoCaretDown color="red" />
          <ul className="dropdown">
            {COUNTRIES.map((e, index) => (
              <li key={`LANGUAGE_ENTRY_${index}`}>
                <div
                  className={i18n.language === e.code ? "language_button selected" : "language_button"}
                  onClick={() => {
                    setLanguage(e.code);
                  }}
                >
                  <ReactCountryFlag
                    className="flag"
                    countryCode={e.iconName}
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                    }}
                    title={e.iconName}
                  />
                  {e.name}
                </div>
              </li>
            ))}
          </ul>
        </li>
        {!authenticated ? (
          <Link href="/auth/login" className="date_text">
            <a className="date_text">
              <LoginIcon />
            </a>
          </Link>
        ) : (
          <div style={{ display: "flex" }}>
            {/* <img src="/images/user.png" style={{ width: 20, height: 20 }} /> */}
            <UserIcon />
            <p className="date_text">{formatValue(user?.balance?.toString())}</p>
            <Button
              onClick={() => {
                dispatch(logout(router));
              }}
            >
              <LogoutIcon />
            </Button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
import Link from "next/link";
import { IoCaretDown } from "react-icons/io5";
import ReactCountryFlag from "react-country-flag";
import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { getBalance } from "../../redux/actions/game";
import COUNTRIES from "../../constants/countries";
import UserIcon from "../../../public/images/svg/user.svg";
import { formatValue } from "../../util/lib";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { user, balance, token  } = useSelector((state) => state.user);
  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const { authenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log('[GET_BALANCE]:[5s]');
      await dispatch(getBalance(token, user.userId,));   
    }, 3 * 60 * 1000);
    return () => {
      clearInterval(interval);
    }
  }, []);

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
          </ul>
        </li>
        <li className="drop">
          <Link href="/superspeed/superspeed">
            <a>
              {t("game_types.superspeed.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            <li>
              <Link href='/superspeed/superspeed'><a>{t("game_types.superspeed.caption")}</a></Link>
            </li>
          </ul>
        </li>
        <li className="drop">
          <Link href="/southern/hochiminh">
            <a>
              {t("game_types.southern.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            <li>
              <Link href='/southern/hochiminh'><a>{t("game_types.southern.hochiminh")}</a></Link>
            </li>
            <li>
              <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
              <a>{t("coming_soon")}</a>
            </li>
          </ul>
        </li>
        <li className="drop">
          <Link href="/central/quangnam">
            <a>
              {t("game_types.central.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            <li>
              <Link href='/central/quangnam'><a>{t("game_types.central.quangnam")}</a></Link>
            </li>
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
        {authenticated &&(
          <div style={{ display: "flex" }}>
            <UserIcon /> &nbsp;&nbsp;&nbsp;
            <p className="date_text">{balance}</p>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

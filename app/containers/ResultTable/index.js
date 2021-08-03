import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

import Dropdown from "../../components/Dropdown";
import { getGameHistory } from "../../redux/actions/game";
import { API_URL } from "../../constants/config";
import { setDate } from "../../util/lib";

const socket = io.connect(API_URL);

const ResultTable = (props) => {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState({});
  const dispatch = useDispatch();

  const onChangeProcess = (val) => {
    setSelectedHistory(val);
  };

  const getHistory = () => {
    dispatch(getGameHistory(props.gameType))
      .then((res) => {
        setHistory(res);
        setSelectedHistory(res[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    socket.on("new result", (data) => {
      getGameHistory();
    });
  }, [socket]);

  return (
    <div className="betting_table">
      <div className="table_container">
        <h5 className="result_text">
          {props.title} {t("lottery_result")}
        </h5>
        <Dropdown
          data={history}
          onChange={(target) => {
            onChangeProcess(target);
          }}
        />
        <p className="result_title">
          {t("result_table.result")} : {setDate(selectedHistory.endTime)}
        </p>
        <table className="table_section">
          <tbody>
            <tr className="table_row">
              <td style={{ color: "red" }}>{t("result_table.red_award")}</td>
              <td>{selectedHistory.numbers?.redAward}</td>
            </tr>
            <tr className="table_row">
              <td>{t("result_table.first_prize")}</td>
              <td>{selectedHistory.numbers?.first}</td>
            </tr>
            <tr className="table_row">
              <td>{t("result_table.second_prize")}</td>
              <td>{selectedHistory.numbers?.second}</td>
            </tr>
            <tr className="table_row">
              <td>{t("result_table.third_prize")}</td>
              <td>{selectedHistory.numbers?.third}</td>
            </tr>
            <tr className="table_row">
              <td>{t("result_table.fourth_prize")}</td>
              <td>{selectedHistory.numbers?.fourth}</td>
            </tr>
            <tr className="table_row">
              <td>{t("result_table.fifth_prize")}</td>
              <td>{selectedHistory.numbers?.fifth}</td>
            </tr>
            <tr className="table_row">
              <td>{t("result_table.sixth_prize")}</td>
              <td>{selectedHistory.numbers?.sixth}</td>
            </tr>
            <tr className="table_row">
              <td>{t("result_table.seventh_prize")}</td>
              <td>{selectedHistory.numbers?.seventh}</td>
            </tr>
          </tbody>
        </table>

        <table className="table_section">
          <tbody>
            <tr className="table_row">
              <th>{t("result_table.head")}</th>
              <th>{t("result_table.tail")}</th>
            </tr>
            <tr className="table_row">
              <td>0</td>
              <td>2, 7, 4, 6</td>
            </tr>
            <tr className="table_row">
              <td>1</td>
              <td>4, 2, 8, 2</td>
            </tr>
            <tr className="table_row">
              <td>2</td>
              <td>0, 7</td>
            </tr>
            <tr className="table_row">
              <td>4</td>
              <td>2, 9, 8</td>
            </tr>
            <tr className="table_row">
              <td>5</td>
              <td>8</td>
            </tr>
            <tr className="table_row">
              <td>6</td>
              <td>8</td>
            </tr>
            <tr className="table_row">
              <td>7</td>
              <td>8</td>
            </tr>
            <tr className="table_row">
              <td>8</td>
              <td>4, 2</td>
            </tr>
            <tr className="table_row">
              <td>9</td>
              <td>3, 1, 5, 7</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
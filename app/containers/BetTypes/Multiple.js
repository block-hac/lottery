import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentBetType, setCurrentDigitType } from "../../redux/actions/game";

import Button from "../../components/Button";
import OddsTheme from "../../components/OddsTheme";

const buttonStyle = {
  borderColor: "#646464",
  color: "#646464",
  marginLeft: "1rem",
  marginRight: "1rem",
};

const Multiple = (props) => {
  const [digitType, setDigitType] = useState("multiple4");
  const [inputType, setInputType] = useState("enter");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const digitTypes = [
    {
      value: "multiple4",
      label: t("bet_types.sub.multiple4"),
      help: t("help6.multiple.multiple4"),
      odds: "7,000",
    },
    {
      value: "multiple3",
      label: t("bet_types.sub.multiple3"),
      help: t("help6.multiple.multiple3"),
      odds: "500",
    },
    {
      value: "multiple3_2",
      label: t("bet_types.sub.multiple3_2"),
      help: t("help6.multiple.multiple3_2"),
      odds: "80",
    },
    {
      value: "multiple2",
      label: t("bet_types.sub.multiple2"),
      help: t("help6.multiple.multiple2"),
      odds: "50",
    },
  ];

  const inputTypes = [
    {
      value: "enter",
      label: t("bet_types.sub.enter"),
    },
  ];

  const createRndScript = (digits) => {
    let phrase = "";
    for (let i = 0; i < digits; i += 1) {
      const rand = Math.floor(Math.random() * 45) + 1;
      if (rand < 10) phrase = phrase + 0 + rand + ";";
      else phrase = phrase + rand + ";";
    }
    props.setScript(phrase);
  };

  useEffect(() => {
    props.clearAll();
    dispatch(
      setCurrentBetType({
        value: "multiple",
        label: t("bet_types.multiple"),
      })
    );
    dispatch(setCurrentDigitType(digitTypes[0]));
  }, []);

  return (
    <div>
      <div className="bet_types_area">
        <Grid container spacing={0}>
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12} style={{ textAlign: "center" }}>
            {digitTypes.map((element, index) => (
              <Button
                type={digitType === element.value ? "selected" : "outlined"}
                title={element.label}
                innerStyle={digitType !== element.value ? buttonStyle : null}
                onClick={() => {
                  setDigitType(element.value);
                  dispatch(setCurrentDigitType(element));
                  props.clearAll();
                }}
                key={`LOT_TYPE_${index}`}
              />
            ))}
          </Grid>
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12} style={{ textAlign: "center" }}>
            {inputTypes.map((element, index) => (
              <Button
                type={inputType === element.value ? "selected" : "outlined"}
                title={element.label}
                innerStyle={inputType !== element.value ? buttonStyle : null}
                onClick={() => {
                  setInputType(element.value);
                }}
                key={`INPUT_TYPES_${index}`}
              />
            ))}
          </Grid>
          <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
            {digitTypes.map(
              (element, index) =>
                digitType === element.value && (
                  <p className="date_text" key={`LOT_HELP_${index}`}>
                    {element.help}
                  </p>
                )
            )}
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            {digitTypes.map(
              (element, index) => digitType === element.value && <OddsTheme key={`ODDS_DESC_${index}`} description={"1  " + t("to") + "  " + element.odds} />
            )}
          </Grid>
        </Grid>
      </div>
      <div className="set_number_area">
        {inputType === "enter" && (
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <textarea
                placeholder={t("select_num.set_script")}
                className="script_area"
                onChange={(e) => {
                  props.setScript(e.target.value);
                }}
                value={props.script}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Grid container spacing={1}>
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                  <Button type="transparent" title={t("select_num.random")} />
                </Grid>
                <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                  <Button
                    title={"4 " + t("numbers")}
                    type="outlined"
                    onClick={() => {
                      createRndScript(4);
                    }}
                  />
                  <Button
                    title={"5 " + t("numbers")}
                    type="outlined"
                    onClick={() => {
                      createRndScript(5);
                    }}
                  />
                  <Button
                    title={"6 " + t("numbers")}
                    type="outlined"
                    onClick={() => {
                      createRndScript(6);
                    }}
                  />
                  <Button
                    title={"7 " + t("numbers")}
                    type="outlined"
                    onClick={() => {
                      createRndScript(7);
                    }}
                  />
                  <Button
                    title={"8 " + t("numbers")}
                    type="outlined"
                    onClick={() => {
                      createRndScript(8);
                    }}
                  />
                </Grid>
              </Grid>
              <div className="row_flex" style={{ justifyContent: "space-around" }}>
                {/* <Button title={t("download")}  type="success" /> */}
                <Button title={t("select_num.erase")} onClick={() => props.clearAll()} type="disabled" />
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
}

export default Multiple;
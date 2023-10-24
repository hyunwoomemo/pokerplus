import { LayoutAnimation } from "react-native";

export const validateLogin = (name, text, error, setError) => {
  if (name === "email") {
    const regEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regEmail.test(text)) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, email: "올바른 이메일 형식이 아닙니다." });
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

      setError({ ...error, email: "" });
    }
  } else {
    const pattern1 = /[0-9]/;
    const pattern2 = /[a-z]/;
    const pattern3 = /[A-Z]/;
    //const pattern4 = /[~!@\#$%<>^&*]/;     // 원하는 특수문자 추가 제거
    const pattern4 = /[^0-9a-zA-Z]/; //이외 문자

    if (!pattern1.test(text) || (!pattern2.test(text) && !pattern3.test(text)) || !pattern4.test(text) || text.length < 8 || text.length > 50) {
      // 8자 이상 영문, 숫자, 특수문자 혼합 사용하여 입력바랍니다.
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, password: "8자 이상 영문, 숫자, 특수문자 혼합 사용하여 입력바랍니다." });
    }

    let samePass_0 = 0; //동일문자 카운트
    let samePass_1 = 0; //연속성(+) 카운드
    let samePass_2 = 0; //연속성(-) 카운드

    for (let i = 0; i < text.length; i++) {
      let chr_pass_0;
      let chr_pass_1;
      let chr_pass_2;

      if (i >= 2) {
        chr_pass_0 = text.charCodeAt(i - 2);
        chr_pass_1 = text.charCodeAt(i - 1);
        chr_pass_2 = text.charCodeAt(i);

        // 동일문자 카운트
        if (chr_pass_0 == chr_pass_1 && chr_pass_1 == chr_pass_2) {
          samePass_0++;
        } else {
          samePass_0 = 0;
        }

        //연속성(+) 카운드
        if (chr_pass_0 - chr_pass_1 == 1 && chr_pass_1 - chr_pass_2 == 1) {
          samePass_1++;
        } else {
          samePass_1 = 0;
        }

        //연속성(-) 카운드
        if (chr_pass_0 - chr_pass_1 == -1 && chr_pass_1 - chr_pass_2 == -1) {
          samePass_2++;
        } else {
          samePass_2 = 0;
        }
      }

      if (samePass_0 > 0) {
        setError({ ...error, password: "동일문자를 3자 이상 연속 입력할 수 없습니다." }); //동일문자를 3자 이상 연속 입력할 수 없습니다.
      }

      if (samePass_1 > 0 || samePass_2 > 0) {
        setError({ ...error, password: "영문, 숫자는 3자 이상 연속 입력할 수 없습니다." }); //영문, 숫자는 3자 이상 연속 입력할 수 없습니다.
      }
    }
  }
};

export const validateJoin = (name, text, values, error, setError) => {
  if (name === "email") {
    const regEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regEmail.test(text) && text?.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, email: "올바른 이메일 형식이 아닙니다." });
    }
    return;
  } else if (name === "password") {
    const pattern1 = /[0-9]/;
    const pattern2 = /[a-z]/;
    const pattern3 = /[A-Z]/;
    //const pattern4 = /[~!@\#$%<>^&*]/;     // 원하는 특수문자 추가 제거
    const pattern4 = /[^0-9a-zA-Z]/; //이외 문자

    if (!pattern1.test(text) || (!pattern2.test(text) && !pattern3.test(text)) || !pattern4.test(text) || text.length < 8 || text.length > 50) {
      // 8자 이상 영문, 숫자, 특수문자 혼합 사용하여 입력바랍니다.
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, password: "8자 이상 영문, 숫자, 특수문자 혼합 사용하여 입력바랍니다." });
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, password: "" });
    }
    let samePass_0 = 0; //동일문자 카운트
    let samePass_1 = 0; //연속성(+) 카운드
    let samePass_2 = 0; //연속성(-) 카운드

    for (let i = 0; i < text.length; i++) {
      let chr_pass_0;
      let chr_pass_1;
      let chr_pass_2;

      if (i >= 2) {
        chr_pass_0 = text.charCodeAt(i - 2);
        chr_pass_1 = text.charCodeAt(i - 1);
        chr_pass_2 = text.charCodeAt(i);

        // 동일문자 카운트
        if (chr_pass_0 == chr_pass_1 && chr_pass_1 == chr_pass_2) {
          samePass_0++;
        } else {
          samePass_0 = 0;
        }

        //연속성(+) 카운드
        if (chr_pass_0 - chr_pass_1 == 1 && chr_pass_1 - chr_pass_2 == 1) {
          samePass_1++;
        } else {
          samePass_1 = 0;
        }

        //연속성(-) 카운드
        if (chr_pass_0 - chr_pass_1 == -1 && chr_pass_1 - chr_pass_2 == -1) {
          samePass_2++;
        } else {
          samePass_2 = 0;
        }
      }

      if (samePass_0 > 0) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        setError({ ...error, password: "동일문자를 3자 이상 연속 입력할 수 없습니다." }); //동일문자를 3자 이상 연속 입력할 수 없습니다.
      }
      if (samePass_1 > 0 || samePass_2 > 0) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setError({ ...error, password: "영문, 숫자는 3자 이상 연속 입력할 수 없습니다." }); //영문, 숫자는 3자 이상 연속 입력할 수 없습니다.
      }
    }
    return;
  } else if (name === "password2") {
    if (text.length > 0 && values.password !== text) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

      setError({ ...error, password2: "비밀번호가 일치하지 않습니다. " });
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, password2: "" });
    }
    return;
  } else if (name === "engFirst") {
    const pattern = /^[a-zA-Z\s]+$/;
    if (!pattern.test(text) && text.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, engFirst: "영문만 입력 가능합니다." });
    } else {
      setError({ ...error, engFirst: "" });
    }
    return;
  } else if (name === "engLast") {
    const pattern = /^[a-zA-Z\s]+$/;
    if (!pattern.test(text) && text.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, engLast: "영문만 입력 가능합니다." });
    } else {
      setError({ ...error, engLast: "" });
    }
    return;
  } else if (name === "nick") {
    let length = 0;
    let allowCheck = /^[가-힣|a-z|A-Z|0-9]+$/;

    for (let i = 0; i < text.length; i++) {
      // 한글은 2, 영문은 1로 치환
      if (text.charCodeAt(i) > 122) {
        length += 2;
      } else {
        length += 1;
      }
    }
    //닉네임 필수 입력
    if (text == null || text == "") {
      //닉네임 입력은 필수입니다.
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, nick: "닉네임 입력은 필수입니다." });
    } else if (text.search(/\s/) != -1) {
      //닉네임은 빈 칸을 포함 할 수 없습니다.
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, nick: "닉네임은 빈 칸을 포함 할 수 없습니다." });
    } else if (length < 4 || length > 16) {
      // 닉네임은 한글 2~8자, 영문 및 숫자 4~16자 입니다.
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, nick: "닉네임은 한글 2~8자, 영문 및 숫자 4~16자 입니다." });
    } else if (!allowCheck.test(text)) {
      //닉네임은 특수문자를 포함 할 수 없습니다.
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setError({ ...error, nick: "닉네임은 특수문자를 포함 할 수 없습니다." });
    } else {
      setError({ ...error, nick: "" });
    }
    return;
  }
};

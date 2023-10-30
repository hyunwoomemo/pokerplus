import AsyncStorage from "@react-native-async-storage/async-storage";

export const Icon = {
  logo: "https://data.spolive.com/data/template/t08/common/logo_txt.png",
  user: "https://data.spolive.com/data/template/t08/account/icon-user.png",
  password: "https://data.spolive.com/data/template/t08/account/icon-password.png",
  profile: "https://www.pokerplus.co.kr/_next/image?url=%09https%3A%2F%2Fdata.spolive.com%2Fdata%2Ftemplate%2Ft08%2Faccount%2Fprofile_default_img.jpg&w=256&q=75",
  checkPhone: "https://data.spolive.com/data/template/t08/account/auth_img.png",
};

export const footerIcon = {
  active: {
    Home: "https://data.spolive.com/data/template/t08/common/footer_icon_home_on.png",
    TicketNav: "https://data.spolive.com/data/template/t08/common/footer_icon_ticket_on.png",
    Championship: "https://data.spolive.com/data/template/t08/common/footer_icon_champion_on.png",
    Pub: "https://data.spolive.com/data/template/t08/common/footer_icon_pub_on.png",
    NoticeNav: "https://data.spolive.com/data/template/t08/common/footer_icon_notice_on.png",
  },
  basic: {
    Home: "https://data.spolive.com/data/template/t08/common/footer_icon_home.png",
    TicketNav: "https://data.spolive.com/data/template/t08/common/footer_icon_ticket.png",
    Championship: "https://data.spolive.com/data/template/t08/common/footer_icon_champion.png",
    Pub: "https://data.spolive.com/data/template/t08/common/footer_icon_pub.png",
    NoticeNav: "https://data.spolive.com/data/template/t08/common/footer_icon_notice.png",
  },
};

export const deepLinkConfig = {
  screens: {
    Root: {
      screens: {
        InNav: {
          screens: {
            Drawer: {
              screens: {
                Tabs: {
                  screens: {
                    Ticket: "/ticket",
                    Championship: "/championship",
                    Pub: "/pub",
                    Notice: "/notice",
                    Profile: "/profile",
                    QrNav: {
                      screens: {
                        QrSend: "/qrsend",
                        QrScan: "/qrscan",
                      },
                    },
                    Leave: "/leave",
                  },
                },
              },
            },
          },
        },
        OutNav: {
          screens: {
            Login: "/login",
            Join: "/join",
            Terms: "/terms",
            FindIdSuccess: "/findidsuccess",
            FindPwSuccess: "/findpwsuccess",
          },
        },
      },
    },
  },
};

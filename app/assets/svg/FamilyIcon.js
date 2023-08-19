import * as React from 'react';
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const FamilyIcon = props => (
  <Svg
    width={130}
    height={145}
    viewBox="0 0 153 171"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G filter="url(#filter0_d_612_5)">
      <Rect
        x={20}
        y={10.02}
        width={112.498}
        height={130.94}
        rx={15}
        fill="url(#paint0_linear_612_5)"
        shapeRendering="crispEdges"
      />
      <Rect
        x={20.5}
        y={10.52}
        width={111.498}
        height={129.94}
        rx={14.5}
        stroke="#F2F2F2"
        shapeRendering="crispEdges"
      />
    </G>
    <G filter="url(#filter1_d_612_5)">
      <Path
        d="M57.1245 37.625V49H55.1636V37.625H57.1245ZM61.7651 42.6016V44.1562H56.6245V42.6016H61.7651ZM62.4136 37.625V39.1875H56.6245V37.625H62.4136ZM67.9552 47.3047V43.2734C67.9552 42.9714 67.9005 42.7109 67.7912 42.4922C67.6818 42.2734 67.5151 42.1042 67.2912 41.9844C67.0724 41.8646 66.7964 41.8047 66.463 41.8047C66.1557 41.8047 65.8901 41.8568 65.6662 41.9609C65.4422 42.0651 65.2677 42.2057 65.1427 42.3828C65.0177 42.5599 64.9552 42.7604 64.9552 42.9844H63.0802C63.0802 42.651 63.161 42.3281 63.3224 42.0156C63.4839 41.7031 63.7182 41.4245 64.0255 41.1797C64.3328 40.9349 64.7 40.7422 65.1271 40.6016C65.5542 40.4609 66.0333 40.3906 66.5646 40.3906C67.2 40.3906 67.7625 40.4974 68.2521 40.7109C68.7469 40.9245 69.1349 41.2474 69.4162 41.6797C69.7026 42.1068 69.8458 42.6432 69.8458 43.2891V47.0469C69.8458 47.4323 69.8719 47.7786 69.924 48.0859C69.9813 48.388 70.062 48.651 70.1662 48.875V49H68.2365C68.1479 48.7969 68.0776 48.5391 68.0255 48.2266C67.9787 47.9089 67.9552 47.6016 67.9552 47.3047ZM68.2287 43.8594L68.2443 45.0234H66.8927C66.5438 45.0234 66.2365 45.0573 65.9708 45.125C65.7052 45.1875 65.4839 45.2812 65.3068 45.4062C65.1297 45.5312 64.9969 45.6823 64.9083 45.8594C64.8198 46.0365 64.7755 46.237 64.7755 46.4609C64.7755 46.6849 64.8276 46.8906 64.9318 47.0781C65.036 47.2604 65.187 47.4036 65.3849 47.5078C65.588 47.612 65.8328 47.6641 66.1193 47.6641C66.5047 47.6641 66.8406 47.5859 67.1271 47.4297C67.4188 47.2682 67.6479 47.0729 67.8146 46.8438C67.9813 46.6094 68.0698 46.388 68.0802 46.1797L68.6896 47.0156C68.6271 47.2292 68.5203 47.4583 68.3693 47.7031C68.2182 47.9479 68.0203 48.1823 67.7755 48.4062C67.536 48.625 67.2469 48.8047 66.9083 48.9453C66.575 49.0859 66.1896 49.1562 65.7521 49.1562C65.2 49.1562 64.7078 49.0469 64.2755 48.8281C63.8432 48.6042 63.5047 48.3047 63.2599 47.9297C63.0151 47.5495 62.8927 47.1198 62.8927 46.6406C62.8927 46.1927 62.9761 45.7969 63.1427 45.4531C63.3146 45.1042 63.5646 44.8125 63.8927 44.5781C64.2261 44.3438 64.6323 44.1667 65.1115 44.0469C65.5906 43.9219 66.1375 43.8594 66.7521 43.8594H68.2287ZM73.3641 42.2656V49H71.4813V40.5469H73.2547L73.3641 42.2656ZM73.0594 44.4609L72.4188 44.4531C72.4188 43.8698 72.4917 43.3307 72.6375 42.8359C72.7833 42.3411 72.9969 41.9115 73.2781 41.5469C73.5594 41.1771 73.9083 40.8932 74.325 40.6953C74.7469 40.4922 75.2339 40.3906 75.786 40.3906C76.1714 40.3906 76.5229 40.4479 76.8406 40.5625C77.1636 40.6719 77.4422 40.8464 77.6766 41.0859C77.9162 41.3255 78.0985 41.6328 78.2235 42.0078C78.3537 42.3828 78.4188 42.8359 78.4188 43.3672V49H76.536V43.5312C76.536 43.1198 76.4735 42.7969 76.3485 42.5625C76.2287 42.3281 76.0542 42.1615 75.825 42.0625C75.6011 41.9583 75.3328 41.9062 75.0203 41.9062C74.6662 41.9062 74.3641 41.974 74.1141 42.1094C73.8693 42.2448 73.6688 42.4297 73.5125 42.6641C73.3563 42.8984 73.2417 43.1693 73.1688 43.4766C73.0958 43.7839 73.0594 44.112 73.0594 44.4609ZM78.3016 43.9609L77.4188 44.1562C77.4188 43.6458 77.4891 43.1641 77.6297 42.7109C77.7755 42.2526 77.9865 41.8516 78.2625 41.5078C78.5438 41.1589 78.8901 40.8854 79.3016 40.6875C79.713 40.4896 80.1844 40.3906 80.7156 40.3906C81.1479 40.3906 81.5333 40.4505 81.8719 40.5703C82.2156 40.6849 82.5073 40.8672 82.7469 41.1172C82.9865 41.3672 83.1688 41.6927 83.2938 42.0938C83.4188 42.4896 83.4813 42.9688 83.4813 43.5312V49H81.5906V43.5234C81.5906 43.0964 81.5281 42.7656 81.4031 42.5312C81.2833 42.2969 81.1115 42.1354 80.8875 42.0469C80.6636 41.9531 80.3953 41.9062 80.0828 41.9062C79.7912 41.9062 79.5333 41.9609 79.3094 42.0703C79.0906 42.1745 78.9057 42.3229 78.7547 42.5156C78.6037 42.7031 78.4891 42.9193 78.411 43.1641C78.338 43.4089 78.3016 43.6745 78.3016 43.9609ZM87.1011 40.5469V49H85.2104V40.5469H87.1011ZM85.0854 38.3281C85.0854 38.0417 85.1792 37.8047 85.3667 37.6172C85.5594 37.4245 85.825 37.3281 86.1636 37.3281C86.4969 37.3281 86.7599 37.4245 86.9526 37.6172C87.1453 37.8047 87.2417 38.0417 87.2417 38.3281C87.2417 38.6094 87.1453 38.8438 86.9526 39.0312C86.7599 39.2188 86.4969 39.3125 86.1636 39.3125C85.825 39.3125 85.5594 39.2188 85.3667 39.0312C85.1792 38.8438 85.0854 38.6094 85.0854 38.3281ZM90.8458 37V49H88.9552V37H90.8458ZM95.0281 48.0781L97.325 40.5469H99.3406L95.95 50.2891C95.8719 50.4974 95.7703 50.724 95.6453 50.9688C95.5203 51.2135 95.3563 51.4453 95.1531 51.6641C94.9552 51.888 94.7078 52.0677 94.4109 52.2031C94.1141 52.3438 93.7547 52.4141 93.3328 52.4141C93.1662 52.4141 93.0047 52.3984 92.8484 52.3672C92.6974 52.3411 92.5542 52.3125 92.4188 52.2812L92.4109 50.8438C92.463 50.849 92.5255 50.8542 92.5984 50.8594C92.6766 50.8646 92.7391 50.8672 92.7859 50.8672C93.0984 50.8672 93.3589 50.8281 93.5672 50.75C93.7755 50.6771 93.9448 50.5573 94.075 50.3906C94.2104 50.224 94.325 50 94.4188 49.7188L95.0281 48.0781ZM93.7313 40.5469L95.7391 46.875L96.075 48.8594L94.7703 49.1953L91.7 40.5469H93.7313Z"
        fill="#484F76"
      />
    </G>
    <G clipPath="url(#clip0_612_5)">
      <G filter="url(#filter2_d_612_5)">
        <Path
          d="M94.75 98.625H57.25V81.9583L76 64.25L94.75 81.9583V98.625Z"
          fill="#E8EAF6"
        />
        <Path
          d="M91.625 79.875L86.4167 74.6667V67.375H91.625V79.875ZM57.25 98.625H94.75V103.833H57.25V98.625Z"
          fill="#C5CAE9"
        />
        <Path
          d="M75.9998 62.4792L55.1665 81.8542L57.2498 84.1458L75.9998 66.75L94.7498 84.1458L96.8332 81.8542L75.9998 62.4792Z"
          fill="#B71C1C"
        />
        <Path d="M69.75 87.1667H82.25V103.833H69.75V87.1667Z" fill="#D84315" />
        <Path
          d="M72.875 75.7083H79.125V81.9583H72.875V75.7083Z"
          fill="#01579B"
        />
        <Path
          d="M79.6458 94.9792C79.3333 94.9792 79.125 95.1875 79.125 95.5V97.5833C79.125 97.8958 79.3333 98.1042 79.6458 98.1042C79.9583 98.1042 80.1667 97.8958 80.1667 97.5833V95.5C80.1667 95.1875 79.9583 94.9792 79.6458 94.9792Z"
          fill="#FF8A65"
        />
      </G>
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_612_5"
        x1={76.2488}
        y1={10.02}
        x2={76.2488}
        y2={140.96}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C5CAE9" stopOpacity={0} />
        <Stop offset={1} stopColor="#C5CAE9" />
      </LinearGradient>
      <ClipPath id="clip0_612_5">
        <Rect
          width={50}
          height={50}
          fill="white"
          transform="translate(51 58)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default FamilyIcon;

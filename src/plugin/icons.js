/**全局引入icon*/
import * as ElIconModules from '@element-plus/icons-vue'
/**自定义icon组件 */
import iconsComponents from '_c/icons'
/**字节 IconPark 图标*/

// iconpark
import {
  User,
  Lock,
  Alipay,
  Wechat,
  Github,
  Twitter,
  Google,
  MenuUnfoldOne,
  MenuFoldOne,
  FullScreen,
  OffScreen,
  Refresh,
  Remind,
  AllApplication,
  Close,
  ToLeft,
  ToRight,
  Minus,
  Mail,
  Home,
  Code,
  ChartLine,
  Like,
  Xigua,
  Performance,
  Pic,
  MoveOne,
  Search,
  Tailoring,
  TailoringTwo,
  AddText,
  ScanCode,
  Play,
  PauseOne,
  VolumeNotice,
  VolumeMute,
  PlayCycle,
  PlayOnce,
  GoStart,
  GoEnd,
  MusicList,
  LinkCloudFaild,
  LinkInterrupt,
  Copy,
  ChartHistogram,
  MultiPictureCarousel,
  Theme,
  Translate,
} from '@icon-park/vue-next';
import '@icon-park/vue-next/styles/index.css';
// 所需的组件
export const parkComponents = [
  User,
  Lock,
  Alipay,
  Wechat,
  Github,
  Twitter,
  Google,
  MenuUnfoldOne,
  MenuFoldOne,
  FullScreen,
  OffScreen,
  Refresh,
  Remind,
  AllApplication,
  Close,
  ToLeft,
  ToRight,
  Minus,
  Mail,
  Home,
  Code,
  ChartLine,
  Like,
  Xigua,
  Performance,
  Pic,
  MoveOne,
  Search,
  Tailoring,
  TailoringTwo,
  AddText,
  ScanCode,
  Play,
  PauseOne,
  VolumeNotice,
  VolumeMute,
  PlayCycle,
  PlayOnce,
  GoStart,
  GoEnd,
  MusicList,
  LinkCloudFaild,
  Error,
  LinkInterrupt,
  Copy,
  ChartHistogram,
  MultiPictureCarousel,
  Theme,
  Translate,
];

const useIcons = app => {
  // 统一注册element-plus Icon图标
  for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName]
      app.component(iconName, item)
    }
  }
  //注册字节跳动Icon库
  parkComponents.forEach((component) => {
    let cname = `park-${component.name.replace('icon-', '')}`
    app.component(cname, component);
  });
  //注册自定义组件
  app.component('eIcon', iconsComponents.ElementIcon)
  app.component('cIcon', iconsComponents.CustomIcon)
  app.component('pIcon', iconsComponents.ParkIcon)
}

export default useIcons
import Vue from 'vue'
import '../theme/override.scss'
import 'element-ui/lib/theme-chalk/display.css';
import { Button, Row, Col, Container, Header, Aside, Main, Footer, PageHeader, Menu, MenuItem, MenuItemGroup, Submenu, Slider, Cascader, Pagination, Loading } from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Main)
Vue.use(PageHeader)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Slider)
Vue.use(Cascader)
Vue.use(Pagination)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service;
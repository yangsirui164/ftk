import Vue from 'vue'
import { Button, Form, FormItem, Input, Message,Container,Header,Main,
Menu,Submenu,MenuItemGroup,MenuItem,Breadcrumb,BreadcrumbItem,Card,
  Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,MessageBox,Tag,Tree
} from 'element-ui'

//弹框提示组件  需要全局挂载
// import {Message} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)

//面包屑导航
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Card)

Vue.use(Row)
Vue.use(Col)

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Switch)

Vue.use(Tooltip)

Vue.use(Pagination)

Vue.use(Tag)

Vue.use(Tree)
//弹窗组件挂载到了vue圆形
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm

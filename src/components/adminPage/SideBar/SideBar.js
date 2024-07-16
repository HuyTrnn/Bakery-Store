
import "./SideBar.scss";
import "~/components/Header/index"
import {useState, useEffect} from 'react'
import Button from "~/components/Button";
import RenevuePage from "../adminPage"
import { ProSidebar, Menu, MenuItem, SubMenu, Sidebar, useProSidebar, sidebarClasses  } from 'react-pro-sidebar';
import {Link, BrowserRouter } from 'react-router-dom'
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {TbDiscount2} from "react-icons/tb"
import {HiGlobeAlt} from "react-icons/hi"
import {BsCurrencyDollar} from "react-icons/bs"

function SideBar() {

    const logoSrc =
    "https://cdn.shopify.com/s/files/1/2675/2320/files/BAKES__Logo-06_220x.png?v=1638454703";
    return (
        <div className="admin-sidebar">
            <Sidebar>
            <div className="l-4 m-3 c-8">
                <Button to="/" className="nav-bar--logo admin-logo">
                    Trang mua hàng
                </Button>
            </div>
            <Menu 
            menuItemStyles={{
                button: ({ level, active, disabled }) => {
                    // only apply styles on first level elements of the tree
                    if (level === 0 && active == true)
                    {
                        
                    };
                },
                }}
            className="header-sidebar_menu">
                <SubMenu icon={<AiOutlineShoppingCart/>} defaultOpen component={<Link />} label="Đơn hàng">
                    <MenuItem component={<Link to="/admin/carts" />}>Tổng đơn hàng</MenuItem>
                    
                </SubMenu>
                {/* <SubMenu icon={<BsFillPersonFill/>}  label="Khách hàng"> 
                    <MenuItem component={<Link to="/admin/customers"/>}> Khách hàng </MenuItem>
                    <MenuItem component={<Link to="/admin/staffs" />}> Nhân viên </MenuItem>
                </SubMenu> */}
                <SubMenu icon={<TbDiscount2/>} component={<Link  />} label="Sản phẩm"> 
                    <MenuItem component={<Link to="/admin/products"/>} >Danh sách sản phẩm</MenuItem>
                    <SubMenu label="Chỉnh sửa Sản Phẩm">
                        <MenuItem component={<Link to="/admin/addproducts" />}>Thêm sản phẩm</MenuItem>
                        <MenuItem component={<Link to="/admin/productbytypes" />}> Loại Sản Phẩm</MenuItem>
                    </SubMenu>
                </SubMenu>
                <SubMenu icon={<HiGlobeAlt/>} component={<Link  />} label="Website"> 
                    <MenuItem component={<Link to="/designwebsite/slide"/>}>Việc làm</MenuItem>
                </SubMenu>
                <MenuItem icon={<BsCurrencyDollar/>} component={<Link to="/admin/renevue"  />}>Doanh thu</MenuItem>
            </Menu>
            </Sidebar>
    </div>
    )
}


export default SideBar
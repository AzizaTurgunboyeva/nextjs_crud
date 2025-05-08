import React from 'react'
import { SidebarWrapper } from './Sidebar.styles'
import Link from 'next/link'
import Image from 'next/image'

const Sidebar = () => {

    const menuItems = [
      {
        title: "Students",
        route: "/students",
      },
      {
        title: "Teachers",
        route: "/teachers",
      },
      {
        title: "Classes",
        route: "/classes",
      },
      {
        title: "School",
        route: "/school",
      },
    ];

    return (
      <SidebarWrapper>
        <div className="logo">
          <Image src="/logoipsum-352.svg" alt="logo" width={120} height={120} />
        </div>
        <div className="menu-items">
          {menuItems.map((mItem) => {
            return (
              <Link key={mItem.route} href={mItem.route}>
                {mItem.title}
              </Link>
            );
          })}
        </div>
      </SidebarWrapper>
    );
}

export default Sidebar
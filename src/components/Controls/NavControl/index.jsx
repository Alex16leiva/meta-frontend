import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: 100vh;
    background: #f5f5f5; /* Fondo general */
`;

const Sidebar = styled.nav`
    width: ${(props) => (props.collapsed ? "60px" : "250px")};
    background: #ffffff;
    color: #333;
    padding: 10px;
    transition: width 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.collapsed ? "center" : "flex-start")};
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
    position: relative;
`;

const ToggleButton = styled.button`
    background: none;
    border: none;
    color: #555;
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 20px;
`;

const MenuList = styled.ul`
    list-style: none;
    padding: 0;
    width: 100%;
`;

const MenuItem = styled.li`
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.collapsed ? "center" : "flex-start")};
    border-radius: 5px;
    position: relative;
    transition: background 0.2s, color 0.2s;

    background: ${(props) =>
        props.active ? "#1976d2" : props.hovered ? "#e0e0e0" : "transparent"};
    color: ${(props) => (props.active ? "#fff" : "#333")};

    &:hover {
        background: ${(props) => (props.active ? "#1565c0" : "#e0e0e0")};
    }

    &:hover::after {
        content: "${(props) => (props.collapsed ? props.label : "")}";
        position: absolute;
        left: 70px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        white-space: nowrap;
        font-size: 14px;
        visibility: ${(props) => (props.collapsed ? "visible" : "hidden")};
        opacity: ${(props) => (props.collapsed ? "1" : "0")};
        transition: opacity 0.2s ease-in-out;
    }
`;

const MainContent = styled.div`
    flex-grow: 1;
    padding: 20px;
    background: #fff;
    border-left: 1px solid #ddd;
    transition: margin-left 0.3s ease-in-out;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
`;

export default function NavControl({ items }) {
    const [activeItem, setActiveItem] = useState(items[0].id);
    const [collapsed, setCollapsed] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <Container>
            <Sidebar collapsed={collapsed}>
                <ToggleButton onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? "☰" : "✖"}
                </ToggleButton>
                <MenuList>
                    {items.map((item) => (
                        <MenuItem
                            key={item.id}
                            active={activeItem === item.id}
                            collapsed={collapsed}
                            label={item.label}
                            hovered={hoveredItem === item.id}
                            onClick={() => setActiveItem(item.id)}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {collapsed ? "📄" : item.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </Sidebar>

            <MainContent>
                {items.map((item) =>
                    item.id === activeItem ? <item.component key={item.id} /> : null
                )}
            </MainContent>
        </Container>
    );
}

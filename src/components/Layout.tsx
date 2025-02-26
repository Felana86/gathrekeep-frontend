import React, {ReactNode} from "react";

interface LayoutProps {
    children?: ReactNode;
}

export default class Layout extends React.Component<LayoutProps> {
    render() {
        return (
            <>
                <header>
                    <h1>Welcome to my website</h1>
                </header>

                <main>
                    {this.props.children}
                </main>

                <footer>
                    <p>&copy; 2022 My Website</p>
                </footer>
            </>
        )
    }
}
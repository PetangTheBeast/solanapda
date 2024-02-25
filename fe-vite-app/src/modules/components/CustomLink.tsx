import { useMatch, Link as LinkRouter } from 'react-router-dom';

interface CustomLinkProps {
    to: string;
    children: React.ReactNode;
}



export function CustomLink({ to, children }: CustomLinkProps) {
    let match = useMatch(to);
    const linkStyle = {
        marginRight: '12px',
        fontWeight: 'bold', // Add this line for bold text
        textDecoration: match ? 'underline' : 'none',
        width: '100%'
    };
    return (
        <LinkRouter
            to={to}
            style={linkStyle}
        >
            {children}
        </LinkRouter>
    );
}
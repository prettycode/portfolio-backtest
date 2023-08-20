export const PortfolioVisualizerBadge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, style }) => {
    return (
        <span
            title="PortfolioVisualizer.com"
            style={{ ...style, fontSize: 11 }}
            className={className ? `${className} badge bg-light text-dark` : 'badge bg-light text-dark'}
        >
            PV
        </span>
    );
};

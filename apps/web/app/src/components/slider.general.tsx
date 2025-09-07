import React = require("react");

type SliderData = {
    id: string;
    imageUrl?: string;
    title: string;
    description: string;
    link?: string;
};

type SliderProps = {
    data: SliderData[];
    className?: string;
    slideInterval?: number;
    titleTag?: "h2" | "h3";
    linkText?: string;
};

class BaseSlider extends React.Component<SliderProps, { currentIndex: number }> {
    intervalId: NodeJS.Timeout | null = null;
    constructor(props: SliderProps) {
        super(props);
        this.state = { currentIndex: 0 };
    }
    componentDidMount() {
        this.startAutoSlide();
    }
    componentWillUnmount() {
        this.stopAutoSlide();
    }
    startAutoSlide() {
        const interval = this.props.slideInterval ?? 5000;
        this.intervalId = setInterval(() => {
            this.setState((prevState) => ({
                currentIndex: (prevState.currentIndex + 1) % this.props.data.length
            }));
        }, interval);
    }
    stopAutoSlide() {
        if (this.intervalId) clearInterval(this.intervalId);
    }
    goToSlide(index: number) {
        this.setState({ currentIndex: index });
        this.stopAutoSlide();
        this.startAutoSlide();
    }
    render() {
        const { data, className = "", titleTag = "h2", linkText = "Learn More" } = this.props;
        const { currentIndex } = this.state;
        const TitleTag = titleTag;
        return (
            <div className={className}>
                <div className="slides">
                    {data.map((item, index) => (
                        <div
                            key={item.id}
                            className={`slide ${index === currentIndex ? "active" : ""}`}
                            style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : undefined}
                        >
                            <div className="slide-content">
                                <TitleTag>{item.title}</TitleTag>
                                <p>{item.description}</p>
                                {item.link && <a href={item.link} className="slide-link">{linkText}</a>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="indicators">
                    {data.map((_, index) => (
                        <span
                            key={index}
                            className={`indicator ${index === currentIndex ? "active" : ""}`}
                            onClick={() => this.goToSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
        );
    }
}

export class SliderGeneral extends React.Component<{ data: SliderData[] }> {
    render() {
        return (
            <BaseSlider
                data={this.props.data}
                className="slider-general"
                slideInterval={5000}
                titleTag="h2"
                linkText="Learn More"
            />
        );
    }
}

export class InfoSlider extends React.Component<{ data: SliderData[] }> {
    render() {
        return (
            <BaseSlider
                data={this.props.data}
                className="info-slider"
                slideInterval={7000}
                titleTag="h3"
                linkText="Read More"
            />
        );
    }
}

export default SliderGeneral;
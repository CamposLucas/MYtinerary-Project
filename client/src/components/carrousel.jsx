import React from 'react';
import {Link} from 'react-router-dom';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import {connect} from 'react-redux';



class CarrouselPopular extends React.Component {
	constructor(props) {
		super(props);
    this.state = { 
      activeIndex: 0,
      items: [] 
    };
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
  }
  
  componentDidMount(){
    var itemsAux = [];
    var aux = []


    for (var i = 0; i < 12; i += 4) {
      aux.push(this.props.city.cities[i]);
      aux.push(this.props.city.cities[i+1]);
      aux.push(this.props.city.cities[i+2]);
      aux.push(this.props.city.cities[i+3]);

      itemsAux.push(aux);

      aux = [];
    }
		this.setState({items: itemsAux});
	}

	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}

	render() {
    const { activeIndex } = this.state;
		const slides = this.state.items.map((item, index) => {
			return (
					<CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={index}> 
							{this.state.items[index].map((item, i) => 
								<div id="carousel-image" key={i}>
									<Link to={`/itineraries/${item._id}`}><p>{item.name}</p></Link>
									<img src={item.img} alt={item.altText} width="100%"/>
								</div>
              )}
					</CarouselItem>
			);
		});

		return (
			<div>
				<Carousel
					activeIndex={activeIndex}
					next={this.next}
					previous={this.previous}
				>
					<CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
					{slides}
					<CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
					<CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
				</Carousel>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	city: state.city
})

export default connect(mapStateToProps)(CarrouselPopular);
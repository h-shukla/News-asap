import React from 'react';
import NewsItem from './NewsItem.js';
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';

export default class News extends React.Component {
    static defaultProps = {
        country:'in',
        pageSize:12,
        category: 'general',
        apikey: '932974e4a67f46c987287775cd2cd325'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apikey: PropTypes.string,
    }

    constructor(props) {
        // A constructor is called everytime a class is called
        // super class' constructor should be called
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };

        // just for visual effects
        if(props.category === 'general'){
            document.title = `Home - NASAP`;
        } else {
            document.title = `${this.capitalizeFirstLetter(this.props.category)} - NASAP`;
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    topScroll = () => {
        document.body.scrollTop=0;
        document.documentElement.scrollTop=0;
    };

    async updateNews(pageNo) {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false});
    }
    
    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        this.topScroll();
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }

    handleNextClick = async () => {
        this.topScroll();
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }

    render() {
        return (
            <div className="container my-3">
              <h2 className="text-center" style={{margin: '35px',}}>NASAP - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
              {this.state.loading && <Spinner />}
              <div className="row">
                {this.state.articles.map((element) => {
                    return <div className="col-md-4" key={element.url} >
                                 <NewsItem title={element.title?element.title.slice(0, 65):""} description={element.description?element.description.slice(0, 100):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                               </div>;
                })}
              </div>
              <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={Math.ceil(this.state.totalResults/this.props.pageSize) < this.state.page + 1} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
              </div>
            </div>
        );
    }
};

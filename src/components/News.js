import React from 'react';
import NewsItem from './NewsItem.js';
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';

export default class News extends React.Component {

    static defaultProps = {
        country:'in',
        pageSize:12,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        // A constructor is called everytime a class is called
        // super class' constructor should be called
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }

    topScroll = () => {
        document.body.scrollTop=0;
        document.documentElement.scrollTop=0;
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=932974e4a67f46c987287775cd2cd325&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
    }

    handlePreviousClick = async () => {
        this.topScroll();
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}c&ategory=${this.props.category}&apiKey=932974e4a67f46c987287775cd2cd325&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false,
        });
    }

    handleNextClick = async () => {
        this.topScroll();

        if (!(Math.ceil(this.state.totalResults/this.props.pageSize) < this.state.page + 1)) {

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=932974e4a67f46c987287775cd2cd325&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false,
            });
        }
    }

    render() {
        return (
            <div className="container my-3">
              <h2 className="text-center" style={{margin: '35px',}}>NASAP - Top headlines</h2>
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

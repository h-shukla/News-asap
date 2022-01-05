import React from 'react';

export default class NewsItem extends React.Component {
    render() {
        // props
        let { title, description, imageUrl, newsUrl, author, date } = this.props;

        return (
            <div className="my-3">
              <div className="card">
                <img src={!imageUrl ? "https://media.istockphoto.com/photos/abstract-digital-news-concept-picture-id1290904409?b=1&k=20&m=1290904409&s=170667a&w=0&h=6khncht98kwYG-l7bdeWfBNs_GGcG1pDqzLb6ZXhh7I=" : imageUrl} className="card-img-top" alt="news headline" />
                <div className="card-body">
                  <h5 className="card-title">{title}...</h5>
                  <p className="card-text">{description}...</p>
                  <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                  <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more...</a>
                </div>
              </div>
            </div>
        );
    }
};

// TODO
// instead of showing GMT
// should probably add timezone according to the location of the user
// imageurl is set to a default news image if the image is not provided by the api

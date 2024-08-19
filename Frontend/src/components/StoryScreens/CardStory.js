import React from 'react';
import { Link } from 'react-router-dom';


const Story = ({ story }) => {
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("en-US", options);
    };

    const truncate = (text, length) => {
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

    // Assuming an average reading speed to estimate time
    const calculateReadTime = (content) => {
        const wordsPerMinute = 200; // Average reading speed
        const textLength = content.split(" ").length;
        const time = Math.ceil(textLength / wordsPerMinute);
        return time <= 1 ? "1 min read" : `${time} mins read`;
    };

    return (
        <Link to={`/story/${story.slug}`} className="story-link">
            <div className="story-card">
                <div className="story-image-container">
                    <img className="story-image" src={`/storyImages/${story.image}`} alt={story.title} />
                </div>
                <div className="story-details">
                    <h5 className="story-title">{truncate(story.title, 70)}</h5>
                    <p className="story-text" dangerouslySetInnerHTML={{ __html: truncate(story.content, 100) }} />
                    <div className="story-info">
                        <p className="story-date">{formatDate(story.createdAt)}</p>
                        <p className="story-read-time">{calculateReadTime(story.content)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Story;

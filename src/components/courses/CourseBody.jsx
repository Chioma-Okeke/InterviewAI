import React, { useLayoutEffect, useState } from "react";
import PropTypes from "prop-types"

import Module from "./courseSections/Module";
import Faq from "./courseSections/FAQ"
import Notes from "./courseSections/Notes";
import Overview from "./courseSections/Overview";
import CourseContent from "./CourseContent";

function CourseBody({currentDisplay, content, imageContent, parts}) {
    const [pageContent, setPageContent] = useState(() => window.innerWidth > 1024 ? Module : CourseContent)

    useLayoutEffect(() => {
        switch(currentDisplay) {
            case "Notes": {
                setPageContent(() => Notes)
                break;
            }
            case "Module": {
                setPageContent(() => Module)
                break;
            }
            case "Q&A": {
                setPageContent(() => Faq)
                break;
            }
            case "Overview": {
                setPageContent(() => Overview)
                break;
            }
            case "Course Content": {
                setPageContent(() => CourseContent)
            }
        }
    }, [currentDisplay])

    return (
        <section>
            {React.createElement(pageContent, {content, imageContent, parts})}
        </section>
    );
}

CourseBody.propTypes = {
    currentDisplay: PropTypes.string,
    content: PropTypes.object,
    imageContent: PropTypes.object,
    parts: PropTypes.array
}

export default CourseBody;

import React from "react";
import DummyImage from "../../../assets/image.png";

function Module() {
    return (
        <div className="flex flex-col gap-4 lg:max-w-[683px]">
            <img src={DummyImage} alt="" />
            <p className="text-primary-dark dark:text-primary-light text-sm text-justify">
                When preparing for a UX Designer role, it’s crucial to
                understand the specific industry standards and trends relevant
                to the company you're applying to. Start by researching the
                design practices common in their industry. For example, if
                you're applying to a tech startup, look into the latest trends
                in app design, like personalization and dark mode interfaces. If
                it’s a finance company, focus on security and clarity in design.
                Understanding these standards shows that you’re not just a great
                designer but one who can adapt to industry-specific needs. Also,
                review the company’s recent projects and identify patterns in
                their design approach. Are they prioritizing accessibility? Do
                they use certain tools or follow specific design systems?
                Aligning your skills with what’s important in their industry
                will help you speak confidently about how you can add value to
                their team. By showing that you’re knowledgeable about both the
                company and the industry’s current design landscape, you
                position yourself as an informed and adaptable candidate.
            </p>
        </div>
    );
}

export default Module;

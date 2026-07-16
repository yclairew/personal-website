type CourseworkContentProps = {
  t: any;
  isChinese: boolean;
};

export default function CourseworkContent({
  t,
  isChinese,
}: CourseworkContentProps) {
  return (
    <>
        <h1 className={`heading-text text-center text-text underline 
            decoration-[0.19rem] decoration-accent mt-5
            ${isChinese ? 
            "text-5xl lg:text-[10rem] mt-18 mb-5! underline-offset-10 lg:underline-offset-20" 
            : "underline-offset-[0.3rem] text-[5rem] lg:text-[10.25rem]"
            }`}
        >
            {t.coursework_heading}
        </h1>

        <div className="inspire-div pt-5 pl-6 pr-6 pb-7 mb-6 lg:pt-15 lg:pl-15 lg:pr-15 lg:pb-20 lg:mb-15 bg-accent-light">
            <h2 className="reveal-box areas-subheading subheadings mb-7 lg:mb-8 text-2xl lg:text-4xl">{t.coursework_inspire_heading}</h2>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="body-text border-l-3 border-accent pl-4">
                    <h3 className="text-xl lg:text-3xl third-level-headings mb-2">{t.coursework_datascience_title}</h3>
                    <p className="text-base lg:text-xl">
                    {t.coursework_datascience_text_prefix}{" "}
                    <a href="https://www.signifyhealth.com/" target="_blank" rel="noopener noreferrer">{t.coursework_datascience_link}</a>{" "}
                    {t.coursework_datascience_text_suffix}
                    </p>
                </div>

                <div className="body-text border-l-3 border-accent pl-4">
                    <h3 className="text-xl lg:text-3xl third-level-headings mb-2">{t.coursework_ai_title}</h3>
                    <p className="text-base lg:text-xl">
                    {t.coursework_ai_text_prefix}{" "}
                    <a href="https://www.xiameng.org/" target="_blank" rel="noopener noreferrer">{t.coursework_ai_link}</a>{" "}
                    {t.coursework_ai_text_suffix}
                    </p>
                </div>

                <div className="body-text border-l-4 border-accent pl-4">
                    <h3 className="text-xl lg:text-3xl third-level-headings mb-2">{t.coursework_business_title}</h3>
                    <p className="text-base lg:text-xl">
                    {t.coursework_business_text_prefix}{" "}
                    <a href="https://mays.tamu.edu/ai/ai-minor/" target="_blank" rel="noopener noreferrer">
                        {t.coursework_business_link}
                    </a>
                    {isChinese ? "。" : "."}
                    </p>
                </div>
            </div>
        </div>
    </>
  );
}

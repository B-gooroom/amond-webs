"use client";
import { FAQ } from "@/app/types/setting";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import { SettingCustomerService } from "@/services/setting-customer-service";
import classNames from "classnames";
import { useEffect, useState } from "react";

export default function CustomerService() {
  const [faqs, setFaqs] = useState<FAQ[] | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  useEffect(() => {
    const faqData = async () => {
      const data = await SettingCustomerService();
      if (data) {
        setFaqs(data);
      }
    };
    faqData();
  }, []);

  // console.log("faqs", faqs);

  if (!faqs) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header title="고객센터" leftItem="IconLeftArrow" />
      {faqs.map((faq, index) => {
        const { question, answer } = faq;
        return (
          <div key={index} className="px-16">
            <button
              onClick={() => toggleFaq(index)}
              className={classNames(
                "flex justify-between items-center w-full px-8 py-10",
                openIndex === index ? "" : "border-b"
              )}
            >
              <span className="text-body1">{question}</span>
              <span>
                {openIndex === index ? (
                  <Icon icon="IconDropup" />
                ) : (
                  <Icon icon="IconDropdown" />
                )}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-8">
                <p className="text-body2">{answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

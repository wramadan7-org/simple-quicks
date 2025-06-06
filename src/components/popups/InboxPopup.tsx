import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/search-popup-icon.svg";
import PeopleGrayIcon from "../../assets/icons/people-gray-icon.svg";
import PeopleWhiteIcon from "../../assets/icons/people-white-icon.svg";
import CustomCircularProgress from "../progress/CustomCircularProgress";
import { formatDate } from "../../utils/datetime";

export default function InboxPopup() {
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingState(false);
    }, 1000);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex max-w-1/3 max-h-3/4 bg-white text-black fixed right-8 bottom-26 z-50 rounded-md py-6 gap-[22px]"
    >
      {isLoadingState && (
        <div className="flex flex-col w-full h-full justify-center items-center gap-1">
          <CustomCircularProgress />
          <p className="text-sm text-[#4f4f4f] font-bold">Loading Chats...</p>
        </div>
      )}

      {!isLoadingState && (
        <div className="flex flex-col w-full h-full">
          <div className="relative w-full h-fit px-8">
            <input
              className="w-full h-8 px-2.5 border border-[#828282] rounded-md placeholder:text-[#333333] text-sm relative"
              placeholder="Search"
            />

            <img
              src={SearchIcon}
              alt="Search"
              className="w-3 h-3 absolute right-12 top-1/2 -translate-y-1/2"
            />
          </div>

          {[
            {
              status: "unread",
              name: "Cameron Phillips",
              from: "109220-Naturalization",
              message: "Please check this out!",
              datetime: 1609497000,
              createBy: "user",
            },
            {
              status: "read",
              name: "Ellen",
              from: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
              message: "Hey, please read.",
              datetime: 1622605500,
              createBy: "user",
            },
            {
              status: "read",
              name: "Cameron Phillips",
              from: "8405-Diana SALAZAR MUNGUIA",
              message:
                "I understand your initial concerns and thats very valid, Elizabeth. But you shouldn`t be concerned about it. You are not alone. You are not the only one who is going through this.",
              datetime: 1622524740,
              createBy: "user",
            },
            {
              status: "read",
              name: null,
              from: "FastVisa Support",
              message: "Hey there! Welcome to your inbox.",
              datetime: 1622524740,
              createBy: "system",
            },
          ].map((item, index) => (
            <div
              key={`inbox-${index}`}
              className="px-8 cursor-pointer hover:bg-gray-100/50"
            >
              <div
                className={`flex flex-row flex-nowrap border-t border-[#828282] items-start justify-start gap-x-3 py-[22px]  ${
                  index === 0 && "border-t-0"
                }`}
              >
                <div className="w-[51px] min-w-[51px] h-[34px] flex flex-row relative items-center justify-end">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[34px] h-[34px] bg-[#E0E0E0] rounded-full flex items-center justify-center z-10">
                    <img
                      src={PeopleGrayIcon}
                      alt="Person Icon"
                      className="w-[12px] h-[12px]"
                    />
                  </div>

                  <div className="w-[34px] h-[34px] bg-[#2F80ED] rounded-full flex items-center justify-center z-20">
                    <img
                      src={PeopleWhiteIcon}
                      alt="Person Icon"
                      className="w-[12px] h-[12px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-[#4f4f4f]">
                  <div className="flex flex-row items-start flex-nowrap gap-3">
                    <p className="text-[#2F80ED] font-bold text-sm ">
                      {item?.from}
                    </p>

                    <p className="text-xs text-nowrap">
                      {item?.status === "unread"
                        ? formatDate(item?.datetime, "MMMM D,YYYY HH:mm")
                        : formatDate(item?.datetime, "DD/MM/YYYY HH:mm")}
                    </p>
                  </div>

                  <div className="max-w-11/12 overflow-hidden">
                    {item?.createBy === "user" && (
                      <p className="text-xs font-bold">{item?.name} :</p>
                    )}
                    <p className="text-xs text-ellipsis overflow-hidden line-clamp-1">
                      {item?.message}
                    </p>
                  </div>
                </div>

                {item?.status === "unread" && (
                  <div className="h-full w-fit ml-auto my-auto">
                    <div className="w-[10px] h-[10px] bg-[#EB5757] rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

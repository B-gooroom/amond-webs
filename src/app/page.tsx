import { Metadata } from "next";
import QnA from "./qna/page";

export const metadata: Metadata = {
  title: "카페의 모든 것 | 아몬드",
  description: "카페의 모든 것을 한눈에 볼 수 있는 곳, 아몬드입니다.",
  keywords: "카페 커뮤니티, 베이커리 커뮤니티, 커피 커뮤니티, 디저트 커뮤니티",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://amond.kr/",
    title: "카페의 모든 것 | 아몬드",
    description: "카페의 모든 것을 한눈에 볼 수 있는 곳, 아몬드입니다.",
    siteName: "카페의 모든 것 | 아몬드",
    images: [
      {
        url: "https://xtlpqspaohusobjcvsas.supabase.co/storage/v1/object/sign/amond-img/amond-meta.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhbW9uZC1pbWcvYW1vbmQtbWV0YS5qcGciLCJpYXQiOjE3Mjc5NTM2NDEsImV4cCI6MTc3OTc5MzY0MX0.hJ2M_6y66WoTt8A-ci-H5rdTfbgTXkYc2KHm5wdF_nM&t=2024-10-03T11%3A07%3A21.929Z",
        width: 1200,
        height: 630,
        alt: "아몬드 메타 이미지",
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="h-[100vh]">
      {/* <Login /> */}
      <QnA />
    </div>
  );
}

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="https://nextjs.org/icons/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="https://nextjs.org/icons/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TargetCursor from '@/components/ui/target-cursor';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Angel Macwan Data Scientist',
	description:
		'Portfolio of Angel Macwan - Data Scientist and Data Engineer at IBM specializing in Deep Learning, NLP, and AI Automation',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TargetCursor
					targetSelector='a, button, input[type="submit"], input[type="button"], .clickable, .cursor-target'
					spinDuration={2}
					hoverDuration={0.2}
					hideDefaultCursor={true}
					parallaxOn={true}
				/>
				{children}
			</body>
		</html>
	);
}

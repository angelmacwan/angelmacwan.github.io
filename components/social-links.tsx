'use client';

import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconFileText,
	IconMail,
} from '@tabler/icons-react';

export type SocialLinksProps = {
	className: string;
	iconClassName?: string;
};

export function SocialLinks({
	className,
	iconClassName = 'h-5 w-5',
}: SocialLinksProps) {
	return (
		<>
			<a
				href="https://raw.githubusercontent.com/angelmacwan/resume/refs/heads/main/Angel%20Macwan.pdf"
				target="_blank"
				rel="noopener noreferrer"
				className={className}
			>
				<IconFileText className={iconClassName} />
				<span>Resume</span>
			</a>
			<a
				href="https://www.linkedin.com/in/angel-im/"
				target="_blank"
				rel="noopener noreferrer"
				className={className}
			>
				<IconBrandLinkedin className={iconClassName} />
				<span>LinkedIn</span>
			</a>
			<a
				href="https://github.com/angelmacwan/"
				target="_blank"
				rel="noopener noreferrer"
				className={className}
			>
				<IconBrandGithub className={iconClassName} />
				<span>GitHub</span>
			</a>
			<a
				href="mailto:armacwan@gmail.com"
				className={className}
			>
				<IconMail className={iconClassName} />
				<span>Email</span>
			</a>
		</>
	);
}

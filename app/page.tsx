'use client';
import Threads from '@/components/ui/threads';
import { WobbleCard } from '@/components/ui/wobble-card';
import { ScrollVelocity } from '@/components/ui/scroll-velocity';
import ProfileCard from '@/components/ui/profile-card';
import { motion } from 'motion/react';
import { SocialLinks } from '@/components/social-links';

import {
	IconBrain,
	IconDatabase,
	IconCpu,
	IconMouse,
} from '@tabler/icons-react';

export default function Home() {
	const socialLink =
		'inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 text-neutral-100 transition-colors hover:bg-white/10 p-2';

	const get_skills = () => {
		const skill_a = [
			'Python',
			'GO',
			'JavaScript',
			'Java',
			'C++',
			'SQL',
			'NoSQL',
			'AWS',
			'GCP',
		];

		const skill_b = [
			'TensorFlow',
			'PyTorch',
			'PySpark',
			'Hadoop',
			'Sqoop',
			'Flask',
			'FastAPI',
			'Docker',
			'LangChain',
			'JAX',
			'RAG Systems',
		];

		const separator = ' / ';

		return [
			skill_a.join(separator) + separator,
			skill_b.join(separator) + separator,
		];
	};

	return (
		<div className="w-full min-h-screen bg-slate-950">
			{/* Hero Section with Spotlight */}

			<div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-slate-950">
				<div className="absolute inset-0 w-full h-full">
					<Threads
						amplitude={1}
						distance={0}
						enableMouseInteraction
					/>
				</div>
				<div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
						{/* Left Side - Pixelated Canvas */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="flex justify-center lg:justify-end"
						>
							<ProfileCard
								name="Angel Macwan"
								title="Data Scientist"
								handle="angelmacwan"
								status="Online"
								contactText="Contact Me"
								avatarUrl="/profile.png"
								showUserInfo={false}
								enableTilt={true}
								enableMobileTilt
								onContactClick={() =>
									console.log('Contact clicked')
								}
								showIcon
								showBehindGlow
								behindGlowColor="hsla(257, 90%, 70%, 0.82)"
								customInnerGradient="linear-gradient(145deg,hsla(245, 40%, 45%, 0.55) 0%,hsla(4, 96%, 68%, 0.27) 100%)"
							/>
						</motion.div>

						{/* Right Side - Big Bold Text */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="text-center lg:text-left space-y-8"
						>
							<motion.div
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.35, duration: 0.8 }}
								className="space-y-3"
							>
								<h1 className="md:text-5xl lg:text-6xl font-bold text-neutral-50 leading-tight">
									I turn complex data into actionable
									narratives.
								</h1>
								<p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto lg:mx-0">
									Specialized in Machine Learning, Predictive
									Modeling, and making sense of the noise.
								</p>
							</motion.div>

							{/* Social Links */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5, duration: 0.8 }}
								className="flex flex-wrap gap-4 justify-center lg:justify-start"
							>
								<SocialLinks className={socialLink} />
							</motion.div>
						</motion.div>
					</div>
				</div>

				{/* Scroll Indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 1 }}
					className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
				>
					<div className="flex flex-col items-center gap-2 text-neutral-400 animate-bounce">
						<span className="text-[10px] tracking-widest uppercase">
							Scroll
						</span>
						<IconMouse size={24} />
					</div>
				</motion.div>
			</div>

			{/* About Me Section */}
			<div className="py-20 bg-slate-950 border-t border-white/10">
				<div className="max-w-5xl mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						<h2 className="text-4xl md:text-6xl font-bold text-center text-neutral-50 mb-12">
							About Me
						</h2>
						<div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
							<p>
								I&apos;m a Data Scientist and Data Engineer at
								IBM with a Master&apos;s degree in Data Science.
								My passion lies in leveraging cutting-edge
								technologies to solve complex problems through
								data-driven insights and intelligent automation.
							</p>
							<p>
								With expertise in Deep Learning, Natural
								Language Processing, and AI Automation, I
								specialize in building scalable machine learning
								solutions using Python, TensorFlow, PyTorch, and
								Big Data technologies like Hadoop and Spark.
							</p>
							<p>
								Throughout my career, I&apos;ve worked on
								diverse projects ranging from blood cell
								detection using YOLO V8, to simulating
								autonomous vehicles with genetic algorithms, to
								enterprise level RAG Applications. I&apos;m also
								a published researcher in the field of Data
								Science and Bioinformatics.
							</p>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Projects Section with Wobble Cards */}
			<div className="py-20 bg-slate-950 border-t border-white/10">
				<div className="max-w-7xl mx-auto px-4">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-4xl md:text-6xl font-bold text-center text-neutral-50 mb-16"
					>
						Featured Projects
					</motion.h2>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
						<WobbleCard
							containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
							className=""
						>
							<div className="max-w-xs">
								<h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
									CognIQ - AI Usage Tracker
								</h2>
								<p className="mt-4 text-left  text-base/6 text-neutral-200">
									Track cognitive outsourcing patterns with AI
									tools like ChatGPT, Claude, and Gemini. Gain
									insights into your AI reliance and build
									healthier, more intentional habits with
									analytics and personalized insights.
								</p>
								<a
									href="https://github.com/angelmacwan/CognIQ"
									target="_blank"
									rel="noopener noreferrer"
									className="mt-4 inline-flex items-center text-cyan-300 hover:text-cyan-200"
								>
									View Project →
								</a>
							</div>
							<IconBrain className="absolute -right-4 lg:-right-[10%] grayscale filter -bottom-10 object-contain rounded-2xl w-40 h-40 text-cyan-500/20" />
						</WobbleCard>
						<WobbleCard containerClassName="col-span-1 min-h-[300px] bg-purple-800">
							<h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
								Pluto - ML Pipeline Builder
							</h2>
							<p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
								Visual node-based machine learning workflow
								builder. Design ML pipelines with drag-and-drop
								interface and generate Python code
								automatically.
							</p>
							<a
								href="https://github.com/angelmacwan/pluto"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 inline-flex items-center text-cyan-300 hover:text-cyan-200"
							>
								View Project →
							</a>
						</WobbleCard>
						<WobbleCard containerClassName="col-span-1 min-h-[300px] bg-blue-900">
							<h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
								Self-Driving Cars Simulation
							</h2>
							<p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
								Simulating autonomous vehicles using Genetic
								Algorithms and Neural Networks to evolve
								intelligent driving behavior.
							</p>
							<a
								href="https://github.com/angelmacwan/Genetic-Algorithms-and-Neural-Agents"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 inline-flex items-center text-cyan-300 hover:text-cyan-200"
							>
								View Project →
							</a>
						</WobbleCard>
						<WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-emerald-800 min-h-[300px]">
							<div className="max-w-xs">
								<h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
									Blood Cell Detection
								</h2>
								<p className="mt-4 text-left  text-base/6 text-neutral-200">
									Comparative analysis of YOLO V8 and R-CNN
									for accurate blood cell detection using deep
									learning techniques.
								</p>
								<a
									href="https://github.com/angelmacwan/Blood-Cell-Object-Detection-using-YOLO-V8"
									target="_blank"
									rel="noopener noreferrer"
									className="mt-4 inline-flex items-center text-cyan-300 hover:text-cyan-200"
								>
									View Project →
								</a>
							</div>
							<IconCpu className="absolute -right-4 lg:-right-[10%] grayscale filter -bottom-10 object-contain rounded-2xl w-40 h-40 text-emerald-500/20" />
						</WobbleCard>
						<WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-indigo-800 min-h-[300px]">
							<div className="max-w-xs">
								<h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
									Disease-Gene Association Classification
								</h2>
								<p className="mt-4 text-left  text-base/6 text-neutral-200">
									Published research using BERT, DNN, and RNN
									models for classifying disease-gene
									associations from biomedical literature
									through text mining.
								</p>
								<a
									href="https://github.com/angelmacwan/Disease-Gene-Association-Classification"
									target="_blank"
									rel="noopener noreferrer"
									className="mt-4 inline-flex items-center text-cyan-300 hover:text-cyan-200"
								>
									View Research →
								</a>
							</div>
							<IconDatabase className="absolute -right-4 lg:-right-[10%] grayscale filter -bottom-10 object-contain rounded-2xl w-40 h-40 text-indigo-500/20" />
						</WobbleCard>
						<WobbleCard containerClassName="col-span-1 min-h-[300px] bg-orange-800">
							<h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
								Enterprise RAG Platform
							</h2>
							<p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
								Enterprise-ready RAG system featuring granular
								access control groups, comprehensive audit
								logging, and a scalable architecture powered by
								Gemini.
							</p>
							<a
								href="https://github.com/angelmacwan/PrivateRAG"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 inline-flex items-center text-cyan-300 hover:text-cyan-200"
							>
								View Project →
							</a>
						</WobbleCard>
					</div>
				</div>
			</div>

			{/* Skills Section with Scroll Velocity */}
			<div className="py-20 bg-slate-950 border-t border-white/10">
				<div className="overflow-hidden">
					<ScrollVelocity
						texts={get_skills()}
						velocity={80}
						className="custom-scroll-text text-white/70"
					/>
				</div>
			</div>

			{/* Contact Section */}
			<div className="py-20 bg-slate-950 border-t border-white/10">
				<div className="max-w-5xl mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center space-y-8"
					>
						<h2 className="text-4xl md:text-6xl font-bold text-neutral-50 mb-12">
							Get In Touch
						</h2>
						<p className="text-xl text-neutral-300 max-w-2xl mx-auto">
							I&apos;m always open to discussing new projects,
							creative ideas, or opportunities to be part of your
							vision.
						</p>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.8 }}
							className="flex flex-wrap gap-6 justify-center items-center pt-8"
						>
							<SocialLinks className={socialLink} />
						</motion.div>
					</motion.div>
				</div>
			</div>

			{/* Footer */}
			<div className="py-12 bg-slate-950 border-t border-white/10">
				<div className="max-w-7xl mx-auto px-4 text-center">
					<p className="text-neutral-400">
						Mac Angel | armacwan@gmail.com | angel.macwan@ibm.com
					</p>
				</div>
			</div>
		</div>
	);
}

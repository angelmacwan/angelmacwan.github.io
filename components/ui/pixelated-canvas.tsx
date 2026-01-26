'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface PixelatedCanvasProps {
	src?: string;
	width?: number;
	height?: number;
	cellSize?: number;
	dotScale?: number;
	shape?: 'circle' | 'square';
	backgroundColor?: string;
	grayscale?: boolean;
	className?: string;
	responsive?: boolean;
	dropoutStrength?: number;
	interactive?: boolean;
	distortionStrength?: number;
	distortionRadius?: number;
	distortionMode?: 'repel' | 'attract' | 'swirl';
	followSpeed?: number;
	sampleAverage?: boolean;
	tintColor?: string;
	tintStrength?: number;
	maxFps?: number;
	objectFit?: 'cover' | 'contain' | 'fill' | 'none';
	jitterStrength?: number;
	jitterSpeed?: number;
	fadeOnLeave?: boolean;
	fadeSpeed?: number;
}

interface Dot {
	x: number;
	y: number;
	r: number;
	g: number;
	b: number;
	a: number;
	originalX: number;
	originalY: number;
}

export const PixelatedCanvas = ({
	src = '/profile.png',
	width = 400,
	height = 500,
	cellSize = 3,
	dotScale = 0.9,
	shape = 'square',
	backgroundColor = '#000000',
	grayscale = false,
	className,
	responsive = false,
	dropoutStrength = 0.4,
	interactive = true,
	distortionStrength = 3,
	distortionRadius = 80,
	distortionMode = 'swirl',
	followSpeed = 0.2,
	sampleAverage = true,
	tintColor = '#FFFFFF',
	tintStrength = 0.2,
	maxFps = 60,
	objectFit = 'cover',
	jitterStrength = 4,
	jitterSpeed = 4,
	fadeOnLeave = true,
	fadeSpeed = 0.1,
}: PixelatedCanvasProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const dotsRef = useRef<Dot[]>([]);
	const mouseRef = useRef({ x: -1000, y: -1000 });
	const targetMouseRef = useRef({ x: -1000, y: -1000 });
	const animationFrameRef = useRef<number>();
	const lastFrameTimeRef = useRef<number>(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d', { willReadFrequently: true });
		if (!ctx) return;

		const img = new Image();

		img.onload = () => {
			// Set canvas size
			canvas.width = width;
			canvas.height = height;

			// Calculate image dimensions based on objectFit
			let imgX = 0,
				imgY = 0,
				imgWidth = width,
				imgHeight = height;

			if (objectFit === 'cover') {
				const scale = Math.max(width / img.width, height / img.height);
				imgWidth = img.width * scale;
				imgHeight = img.height * scale;
				imgX = (width - imgWidth) / 2;
				imgY = (height - imgHeight) / 2;
			} else if (objectFit === 'contain') {
				const scale = Math.min(width / img.width, height / img.height);
				imgWidth = img.width * scale;
				imgHeight = img.height * scale;
				imgX = (width - imgWidth) / 2;
				imgY = (height - imgHeight) / 2;
			} else if (objectFit === 'fill') {
				imgWidth = width;
				imgHeight = height;
			}

			// Draw image
			ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);

			// Get image data and create dots
			const imageData = ctx.getImageData(0, 0, width, height);
			const pixels = imageData.data;
			const dots: Dot[] = [];

			for (let y = 0; y < height; y += cellSize) {
				for (let x = 0; x < width; x += cellSize) {
					let r = 0,
						g = 0,
						b = 0,
						a = 0,
						count = 0;

					if (sampleAverage) {
						// Sample multiple points in cell
						for (let dy = 0; dy < cellSize; dy++) {
							for (let dx = 0; dx < cellSize; dx++) {
								const px = Math.min(x + dx, width - 1);
								const py = Math.min(y + dy, height - 1);
								const index = (py * width + px) * 4;
								r += pixels[index];
								g += pixels[index + 1];
								b += pixels[index + 2];
								a += pixels[index + 3];
								count++;
							}
						}
						r /= count;
						g /= count;
						b /= count;
						a /= count;
					} else {
						// Sample center point only
						const index = (y * width + x) * 4;
						r = pixels[index];
						g = pixels[index + 1];
						b = pixels[index + 2];
						a = pixels[index + 3];
					}

					// Apply grayscale
					if (grayscale) {
						const gray = 0.299 * r + 0.587 * g + 0.114 * b;
						r = g = b = gray;
					}

					// Apply tint
					const tintR = parseInt(tintColor.slice(1, 3), 16);
					const tintG = parseInt(tintColor.slice(3, 5), 16);
					const tintB = parseInt(tintColor.slice(5, 7), 16);

					r = r * (1 - tintStrength) + tintR * tintStrength;
					g = g * (1 - tintStrength) + tintG * tintStrength;
					b = b * (1 - tintStrength) + tintB * tintStrength;

					// Apply dropout based on contrast
					const brightness = (r + g + b) / 3;
					const contrast = Math.abs(brightness - 128) / 128;
					if (Math.random() > contrast * (1 - dropoutStrength)) {
						continue;
					}

					dots.push({
						x: x + cellSize / 2,
						y: y + cellSize / 2,
						r,
						g,
						b,
						a: a / 255,
						originalX: x + cellSize / 2,
						originalY: y + cellSize / 2,
					});
				}
			}

			dotsRef.current = dots;
			setIsLoaded(true);
		};

		img.onerror = () => {
			console.error('Failed to load image:', src);
			setIsLoaded(false);
		};

		img.src = src;

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [
		src,
		width,
		height,
		cellSize,
		sampleAverage,
		grayscale,
		dropoutStrength,
		tintColor,
		tintStrength,
		objectFit,
	]);

	useEffect(() => {
		if (!isLoaded || !interactive) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const handleMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			targetMouseRef.current = {
				x: ((e.clientX - rect.left) / rect.width) * width,
				y: ((e.clientY - rect.top) / rect.height) * height,
			};
		};

		const handleMouseLeave = () => {
			if (fadeOnLeave) {
				targetMouseRef.current = { x: -1000, y: -1000 };
			}
		};

		canvas.addEventListener('mousemove', handleMouseMove);
		canvas.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			canvas.removeEventListener('mousemove', handleMouseMove);
			canvas.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, [isLoaded, interactive, width, height, fadeOnLeave]);

	useEffect(() => {
		if (!isLoaded) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const animate = (timestamp: number) => {
			const elapsed = timestamp - lastFrameTimeRef.current;
			const frameInterval = 1000 / maxFps;

			if (elapsed < frameInterval) {
				animationFrameRef.current = requestAnimationFrame(animate);
				return;
			}

			lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);

			// Smooth mouse following
			mouseRef.current.x +=
				(targetMouseRef.current.x - mouseRef.current.x) * followSpeed;
			mouseRef.current.y +=
				(targetMouseRef.current.y - mouseRef.current.y) * followSpeed;

			// Clear canvas
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, width, height);

			// Draw dots
			const time = timestamp * 0.001;
			dotsRef.current.forEach((dot) => {
				// Always calculate from original position
				let x = dot.originalX;
				let y = dot.originalY;

				if (interactive) {
					const dx = dot.originalX - mouseRef.current.x;
					const dy = dot.originalY - mouseRef.current.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < distortionRadius) {
						const force =
							(1 - distance / distortionRadius) *
							distortionStrength;
						const angle = Math.atan2(dy, dx);

						if (distortionMode === 'repel') {
							x += Math.cos(angle) * force;
							y += Math.sin(angle) * force;
						} else if (distortionMode === 'attract') {
							x -= Math.cos(angle) * force;
							y -= Math.sin(angle) * force;
						} else if (distortionMode === 'swirl') {
							const perpAngle = angle + Math.PI / 2;
							x += Math.cos(perpAngle) * force;
							y += Math.sin(perpAngle) * force;
						}

						// Add jitter
						const jitterAmount = 1 - distance / distortionRadius;
						x +=
							Math.sin(time * jitterSpeed + dot.originalX) *
							jitterStrength *
							jitterAmount;
						y +=
							Math.cos(time * jitterSpeed + dot.originalY) *
							jitterStrength *
							jitterAmount;
					}
				}

				// Draw dot
				ctx.fillStyle = `rgba(${Math.round(dot.r)}, ${Math.round(dot.g)}, ${Math.round(dot.b)}, ${dot.a})`;

				if (shape === 'circle') {
					ctx.beginPath();
					ctx.arc(x, y, (cellSize * dotScale) / 2, 0, Math.PI * 2);
					ctx.fill();
				} else {
					const size = cellSize * dotScale;
					ctx.fillRect(x - size / 2, y - size / 2, size, size);
				}
			});

			animationFrameRef.current = requestAnimationFrame(animate);
		};

		animationFrameRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [
		isLoaded,
		interactive,
		width,
		height,
		cellSize,
		dotScale,
		shape,
		backgroundColor,
		distortionStrength,
		distortionRadius,
		distortionMode,
		followSpeed,
		jitterStrength,
		jitterSpeed,
		fadeOnLeave,
		fadeSpeed,
		maxFps,
	]);

	return (
		<canvas
			ref={canvasRef}
			className={cn(className)}
			style={{
				width: `${width}px`,
				height: `${height}px`,
			}}
		/>
	);
};

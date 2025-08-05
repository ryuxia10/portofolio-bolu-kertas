import React, { useLayoutEffect, useRef, useCallback } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "" }: { children: React.ReactNode, itemClassName?: string }) => (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
    children,
    className = "",
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = "20%",
    scaleEndPosition = "10%",
    baseScale = 0.85,
    rotationAmount = 0,
    blurAmount = 0,
    onStackComplete,
}: {
    children: React.ReactNode,
    className?: string,
    itemDistance?: number,
    itemScale?: number,
    itemStackDistance?: number,
    stackPosition?: string,
    scaleEndPosition?: string,
    baseScale?: number,
    rotationAmount?: number,
    blurAmount?: number,
    onStackComplete?: () => void,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stackCompletedRef = useRef(false);
    const cardsRef = useRef<HTMLElement[]>([]);
    const lastTransformsRef = useRef(new Map());
    const isUpdatingRef = useRef(false);

    const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value as string);
    }, []);

    const updateCardTransforms = useCallback(() => {
        const container = containerRef.current;
        if (!container || !cardsRef.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const containerTop = container.offsetTop;

        const stackPositionPx = parsePercentage(stackPosition, windowHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, windowHeight);

        const endElement = container.querySelector('.scroll-stack-end') as HTMLElement;
        const endElementTop = endElement ? containerTop + endElement.offsetTop : 0;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = containerTop + card.offsetTop;
            const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
            const pinEnd = endElementTop - windowHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + (i * itemScale);
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < cardsRef.current.length; j++) {
                    const jCardTop = containerTop + cardsRef.current[j].offsetTop;
                    const jTriggerStart = jCardTop - stackPositionPx - (itemStackDistance * j);
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
            }

            const newTransform = { translateY, scale, rotation, blur };
            const lastTransform = lastTransformsRef.current.get(i);

            const hasChanged = !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
                card.style.transform = transform;
                card.style.filter = filter;
                lastTransformsRef.current.set(i, newTransform);
            }

            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        isUpdatingRef.current = false;
    }, [ /* dependencies */ ]);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        cardsRef.current = Array.from(container.querySelectorAll<HTMLElement>(".scroll-stack-card"));
        const transformsCache = lastTransformsRef.current;

        cardsRef.current.forEach((card, i) => {
            if (i < cardsRef.current.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
        });

        window.addEventListener('scroll', updateCardTransforms);
        updateCardTransforms();

        return () => {
            window.removeEventListener('scroll', updateCardTransforms);
            stackCompletedRef.current = false;
            cardsRef.current = [];
            transformsCache.clear();
            isUpdatingRef.current = false;
        };
    }, [itemDistance, updateCardTransforms]);

    return (
        <div className={`scroll-stack-container ${className}`.trim()} ref={containerRef}>
            {children}
            <div className="scroll-stack-end" />
        </div>
    );
};

export default ScrollStack;
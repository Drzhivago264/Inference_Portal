import React, { useState, useEffect, useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import '../component/css/particle.css'

export const ParticleBackground = () => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {

    };

    const options = useMemo(
        () => ({

            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    push: {
                        quantity: 1,
                    },
                    repulse: {
                        area: {
                          gradient: {
                            start: "3b5e98",
                            stop: "#17163e"
                          }
                        },
                        shadow: {
                          color: "#17163e"
                        }
                      },
                },
            },
            
            particles: {
          
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#808080",
                    distance: 250,
                    enable: true,
                    opacity: 0.5,
                    width: 0.5,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 6,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    limit: 250,
                    value: 200,
                },
                opacity: {
                    value: { min: 0.1, max: 1 },
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        sync: false
                    }
                },
                rotate: {
                    value: {
                        min: 0,
                        max: 360
                    },
                    animation: {
                        enable: true,
                        speed: 10,
                        sync: true
                    }
                },
                
                shape: {
                    type: "image",
                    options: {
                        image: [
                            {
                                src: "https://d2f6jmzr77qqg6.cloudfront.net/image/robot-svgrepo-com.svg",
                                width: 32, // this width is used only for image ratio
                                height: 32, // this height is used only for image ratio
                                particles: { /* here you can specify all the particles options you want */
                                }
                            }
                        ]
                    },
                    
                },
                size: {
                    value: 25
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}

            />
        );
    }

    return <></>;
};
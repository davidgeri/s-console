// sConsole.ts
// Main class for s-console library

import type { ConsoleOptions } from './types/core';

export class sconsole {
    private container: HTMLElement | null = null;
    private inputField: HTMLInputElement | null = null;
    private consoleArea: HTMLElement | null = null;
    private commands: Map<string, () => void> = new Map();
    private commandHistory: string[] = [];
    private historyIndex: number = -1;
    private currentInput: string = '';
    private options: ConsoleOptions = {
        fontSize: '14px',
        fontFamily: 'monospace',
        theme: 'dark'
    };

    constructor(containerId?: string, userOptions?: Partial<ConsoleOptions>) {
        if (containerId) {
            this.container = document.getElementById(containerId);
        }

        // Merge user options with defaults
        if (userOptions) {
            this.options = { ...this.options, ...userOptions };
        }

        this.init();
        this.setupDefaultCommands();

        // Make console available globally for debugging
        (window as any).sConsole = this;
    }

    private init() {
        this.createConsole();
        this.setupEventListeners();
    }

    private setupDefaultCommands() {
        // Built-in help command that lists all available commands
        this.addCommand('help', () => {
            const commandList = Array.from(this.commands.keys()).join(', ');
            this.appendToConsole(`Available commands: ${commandList}`);
        });

        // Built-in clear command
        this.addCommand('clear', () => {
            this.clear();
        });

        // Font size adjustment commands
        // this.addCommand('font+', () => {
        //     this.adjustFontSize(2);
        // });

        // this.addCommand('font-', () => {
        //     this.adjustFontSize(-2);
        // });

        // Show current options
        // this.addCommand('options', () => {
        //     this.appendToConsole(`Font Size: ${this.options.fontSize}`);
        //     this.appendToConsole(`Font Family: ${this.options.fontFamily}`);
        //     this.appendToConsole(`Theme: ${this.options.theme}`);
        // });
    }

    private createConsole() {
        const consoleHtml = `
                <div class=":uno: rounded-lg border-2 border-solid border-#1e1e1e">
                    <div class=":uno: text-gray-700 text-sm font-bold my-2 px-3 flex justify-between">
                        <label>Console</label>
                        <div>
                            <svg class="close-button :uno: bg-#1e1e1e cursor-pointer p-1 text-white rounded-md" width="20" height="20" viewBox="0 0 20 20">
                                <path d="M 3 17 L 17 3 M 3 3 L 17 17" stroke="white" stroke-width="2" fill="none" />
                            </svg>
                        </div>
                    </div>
                    <div class=":uno: px-3 bg-#1e1e1e h-56 overflow-y-auto w-full text-white p-3" id="consoleParent">
                        <div class=":uno: bg-#1e1e1e w-full" id="consoleOutput"></div>
                        <div class=":uno: flex">
                            <p class=":uno: text-white">User> </p>
                            <input id="consoleInput" class=":uno: bg-#1e1e1e focus:outline-none w-full text-white" type="text">
                        </div>
                    </div>
                </div>
        `;

        if (this.container) {
            this.container.innerHTML = consoleHtml;
        } else {
            // Create container if none provided
            const div = document.createElement('div');
            div.innerHTML = consoleHtml;
            document.body.appendChild(div);
            this.container = div;
        }

        // Get references to elements
        this.inputField = this.container.querySelector('#consoleInput') as HTMLInputElement;
        this.consoleArea = this.container.querySelector('#consoleOutput') as HTMLElement;

        // Apply initial font styles
        this.applyFontStyles();
    }

    private applyFontStyles() {
        if (this.consoleArea) {
            this.consoleArea.style.fontSize = this.options.fontSize;
            this.consoleArea.style.fontFamily = this.options.fontFamily;
        }
        if (this.inputField) {
            this.inputField.style.fontSize = this.options.fontSize;
            this.inputField.style.fontFamily = this.options.fontFamily;
        }
    }

    // private adjustFontSize(change: number) {
    //     const currentSize = parseInt(this.options.fontSize);
    //     const newSize = Math.max(8, Math.min(32, currentSize + change)); // Min 8px, Max 32px
    //     this.options.fontSize = `${newSize}px`;
    //     this.applyFontStyles();
    //     this.appendToConsole(`Font size changed to: ${this.options.fontSize}`);
    // }

    private setupEventListeners() {
        if (!this.inputField || !this.consoleArea) return;

        const closeButton = this.container?.querySelector('.close-button');
        const parent = this.container?.querySelector('#consoleParent');

        // Close button
        closeButton?.addEventListener('click', () => {
            this.clear();
        });

        // Focus on click
        parent?.addEventListener('click', () => {
            this.inputField?.focus();
        });

        // Handle input, command history, and keyboard shortcuts
        this.inputField.addEventListener('keydown', (event) => {
            // Keyboard shortcuts
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
                event.preventDefault();
                this.clear();
                return;
            }
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                this.inputField!.value = '';
                return;
            }
            if (event.key === 'Escape') {
                this.inputField!.blur();
                return;
            }
            if (event.key === 'Enter' && this.inputField!.value.trim()) {
                event.preventDefault();
                const input = this.inputField!.value.trim();
                this.appendToConsole(`User> ${input}`);
                
                // Add command to history if not empty and not duplicate of last command
                if (input && (this.commandHistory.length === 0 || this.commandHistory[this.commandHistory.length - 1] !== input)) {
                    this.commandHistory.push(input);
                }
                
                // Reset history index
                this.historyIndex = -1;
                this.currentInput = '';

                // Execute command
                if (this.commands.has(input)) {
                    const command = this.commands.get(input)!;
                    command();
                } else {
                    this.appendToConsole(`<span class=":uno: text-red-500">Unknown command: ${input}</span>`);
                }

                this.inputField!.value = '';
                this.scrollToBottom();
                return;
            }

            // History navigation
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (this.historyIndex === -1) {
                    this.currentInput = this.inputField!.value;
                }
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    this.inputField!.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
                }
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (this.historyIndex > -1) {
                    this.historyIndex--;
                    if (this.historyIndex === -1) {
                        this.inputField!.value = this.currentInput;
                    } else {
                        this.inputField!.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
                    }
                }
            }
        });
    }



    public addCommand(key: string, callback: () => void) {
        this.commands.set(key, callback);
    }

    public updateOptions(newOptions: Partial<ConsoleOptions>) {
        this.options = { ...this.options, ...newOptions };
        this.applyFontStyles();
        this.appendToConsole(`Options updated`);
    }

    public appendToConsole(message: string) {
        if (this.consoleArea) {
            this.consoleArea.innerHTML += `<p>${message}</p>`;
        }
    }

    public clear() {
        if (this.consoleArea) {
            this.consoleArea.innerHTML = '';
        }
        if (this.inputField) {
            this.inputField.value = '';
        }
        // Reset history index and current input but keep command history
        this.historyIndex = -1;
        this.currentInput = '';
    }

    private scrollToBottom() {
        const parent = this.container?.querySelector('#consoleParent') as HTMLElement;
        if (parent) {
            parent.scrollTop = parent.scrollHeight;
        }
    }
}

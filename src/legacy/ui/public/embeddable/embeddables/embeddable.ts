/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { ReactNode } from 'react';
import { BehaviorSubject } from 'rxjs';
import { Adapters } from 'ui/inspector';

interface EmbeddableConfiguration {
  id: string;
  type: string;
}

export abstract class Embeddable<I, O> {
  public readonly type: string;
  public readonly id: string;
  protected output: O;
  protected input: I;
  protected changeListeners: Array<(output: O) => void> = [];

  constructor({ type, id }: EmbeddableConfiguration, initialOutput: O, initialInput: I) {
    this.type = type;
    this.id = id;
    this.output = initialOutput;
    this.input = initialInput;
  }

  public onInputChanged(input: I): void {
    this.input = input;
  }

  public getOutput(): Readonly<O> {
    return this.output;
  }

  public getInput(): Readonly<I> {
    return this.input;
  }

  public onOutputChanged(listener: (output: O) => void) {
    this.changeListeners.push(listener);
  }

  public emitOutputChanged() {
    this.changeListeners.forEach(listener => listener(this.output));
  }

  /**
   * Embeddable should render itself at the given domNode.
   */
  public abstract render(domNode: HTMLElement | ReactNode): void;

  /**
   * An embeddable can return inspector adapters if it want the inspector to be
   * available via the context menu of that panel.
   * @return Inspector adapters that will be used to open an inspector for.
   */
  public getInspectorAdapters(): Adapters | undefined {
    return undefined;
  }

  public destroy(): void {
    return;
  }

  public reload(): void {
    return;
  }
}

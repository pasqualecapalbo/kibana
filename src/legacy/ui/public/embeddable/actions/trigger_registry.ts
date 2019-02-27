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

import { Trigger } from 'ui/embeddable/actions/trigger';
import { Filter } from 'ui/embeddable/types';

class TriggerRegistry {
  private triggers: { [key: string]: Trigger<any> } = {};

  public addTrigger<I>(trigger: Trigger<I>) {
    this.triggers[trigger.id] = trigger;
  }

  public getTrigger(id: string) {
    return this.triggers[id];
  }
}

export const triggerRegistry = new TriggerRegistry();

export const SHOW_VIEW_MODE_ACTIONS = 'viewModeMenu';
export const SHOW_EDIT_MODE_ACTIONS = 'editModeMenu';
export const FILTER_ACTION = 'filterAction';

triggerRegistry.addTrigger(new Trigger(SHOW_EDIT_MODE_ACTIONS));
triggerRegistry.addTrigger(new Trigger(SHOW_VIEW_MODE_ACTIONS));
triggerRegistry.addTrigger(new Trigger<Filter[]>(FILTER_ACTION));

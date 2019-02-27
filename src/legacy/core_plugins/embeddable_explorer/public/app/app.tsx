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

import React, { Component, ReactNode } from 'react';
import { EmbeddableFactory } from 'ui/embeddable';
import { DASHBOARD_CONTAINER_TYPE, DashboardContainer } from '../../../kibana/public';
import { DashboardContainerFactory } from '../../../kibana/public/dashboard/embeddables';
import { DashboardState } from '../../../kibana/public/dashboard/selectors';
import { dashboardInput } from './dashboard';

export interface AppProps {
  getEmbeddableFactory: <I, O>(type: string) => EmbeddableFactory<I, O> | undefined;
}

export class App extends Component<AppProps> {
  private dashboardEmbeddableRoot: React.RefObject<HTMLDivElement>;
  private dashboardContainer: DashboardContainer | undefined;
  private mounted: boolean = false;

  constructor(props: AppProps) {
    super(props);
    this.dashboardEmbeddableRoot = React.createRef();
  }

  public async componentDidMount() {
    this.mounted = true;
    const dashboardFactory = this.props.getEmbeddableFactory(
      DASHBOARD_CONTAINER_TYPE
    ) as DashboardContainerFactory;
    dashboardFactory.setGetEmbeddableFactory(this.props.getEmbeddableFactory);
    if (dashboardFactory) {
      this.dashboardContainer = await dashboardFactory.create(
        { id: '123' },
        () => {
          return;
        },
        dashboardInput
      );
      if (this.mounted) {
        this.dashboardContainer.render(this.dashboardEmbeddableRoot.current);
      }
    }
  }

  public componentWillUnmount() {
    this.mounted = false;
    if (this.dashboardContainer) {
      this.dashboardContainer.destroy();
    }
  }

  public render() {
    return (
      <div className="app-container dshAppContainer">
        <h1>Embeddable Exlporation. Here is a Dashboard Embeddable Container:</h1>
        <div ref={this.dashboardEmbeddableRoot} />
      </div>
    );
  }
}

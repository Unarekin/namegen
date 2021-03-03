/**
 * Name generator module
 * @module namegen
 */

import { promises as fs } from 'fs';
import * as path from 'path';
import { resourceUsage } from 'process';
import { Graph } from './graph';

import {
  NameFile,
  Hash
} from './interfaces';

import * as NameFiles from './names';


/**
 * A simple class to handle name generation from a set of example files.
 */
export class NameGenerator {
  // #region Properties (1)

  private _templateHash: Hash<{ [x: string]: Graph }> = {};

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor() {
    /** Bind class methods to ensure context is preserved */

    this.AddTemplate = this.AddTemplate.bind(this);
    Object.values(NameFiles).forEach(this.AddTemplate);
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  /** Adds a parsed template file to our cache. */
  public AddTemplate(template: NameFile) {
    // this._templateHash[template.name.toLowerCase()] = template;
    this._templateHash[template.name.toLowerCase()] = {};

    Object.keys(template.subsets).forEach((subset: string) => {
      this._templateHash[template.name.toLowerCase()][subset] = this.buildGraph(template.subsets[subset]);
    });
  }

  /** Generates a name, providing the name of a template and subset*/
  public GenerateName(template: string, subset: string): string
  /** Generates a name, provided a NameFile and name of subset */
  public GenerateName(template: NameFile, subset: string): string
  /** Generates a name, given a list of strings as a subset */
  public GenerateName(subset: string[]): string
  /** Generates a name, given a parsed graph as a subset */
  public GenerateName(subset: Graph): string
  public GenerateName(template: any, subset?: any): string {

    console.log("Generate Arguments:", arguments);

    if (template && typeof (template) === "string" && subset && typeof (subset) === "string") {
      // Provided name of template and subset
    } else if (template && typeof (subset) === "string") {
      // Provided NameFile and name of subset
    } else if (Array.isArray(subset)) {
      // Provided string of elements for subset
    }

    return "";
  }


  /** Builds a graph representation of a given subset. */
  private buildGraph(subset: string[]): Graph {
    let graph: Graph = new Graph();

    graph.AddNode('origin');
    graph.AddNode('terminus');

    subset.forEach((word: string) => {
      // graph.AddEdge('origin')
      let prevLabel: string = 'origin';
      for (let i = 1; i < word.length; i++) {
        let pair: string = word.substr(i, 2);
        if (graph.GetEdge(pair))
          graph.GetEdge(pair).weight++;
        else
          graph.AddEdge(`${prevLabel.toLowerCase()}-${pair.toLowerCase()}`, prevLabel, pair, { weight: 1 });
        prevLabel = pair;
      }
    });

    return graph;
  }

  /** Returns a random element from a given list. */
  private randomElement(list: any[]): any { return list[Math.floor(Math.random() * list.length)]; }

  // #endregion Private Methods (1)
}

/** Alias export, for backwards compatability. */
/** Even if it's super unlikely anyone's actually using this. */
export { NameGenerator as namegen };
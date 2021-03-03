/**
 * 
 */

import { Hash } from './interfaces';

export class Graph {
  private _edgeHash: Hash<any> = {};
  private _nodeHash: Hash<any> = {};
  private _linkHash: Hash<string> = {};


  constructor() { }

  /** Add a node */
  public AddNode(label: string, properties?: any) {
    this._nodeHash[label] = properties ?? null;
  }

  /** Add an edge */
  public AddEdge(label: string, origin: string, destination: string, properties?: any) {
    this._edgeHash[label] = properties ?? null;
    this._linkHash[`${origin.toLowerCase()}-${destination.toLowerCase()}`] = label;
  }

  /** Retrieves a node by label  */
  public GetNode(label: string): any { return this._nodeHash[label]; }
  /** Retrieves an edge by label */

  public GetEdge(origin: string, destination: string): any
  public GetEdge(label: string): any
  public GetEdge(label: string, destination?: string) {
    if (!destination)
      return this._edgeHash[label.toLowerCase()];
    let edge: string = this._linkHash[`${origin.toLowerCase()}-${destination.toLowerCase()}`];
    return this._edgeHash[edge];
  }
  // public GetEdge(label: string): any { return this._edgeHash[label]; }

  /** Returns list of edges for a given node */
  public GetEdges(label: string): { label: string, data: any }[] {
    console.log("Edges:", this._linkHash[label]);
    return [];
    // return this._linkHash[label].map((edgeLabel: string) => {
    //   let edge = this.GetEdge(edgeLabel)
    //   return {
    //     label: edgeLabel,
    //     data: edge
    //   };
    // });
  }
}
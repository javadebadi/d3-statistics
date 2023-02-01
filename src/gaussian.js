import {curveNatural, range} from 'd3';
import {select, line} from 'd3';
import {curveCardinal, curveBasis} from 'd3';
import {max, min} from 'd3';


/** @class Gaussian Distribution representing a Gaussian (Normal) Distribution. */
class GaussianDistribution {
    /**
     * Creates an instance of Gaussian Distribution.
     *
     * @author: Javad Ebadi
     * @param {number} mu The mean of the Gaussian Distribution.
     * @param {number} sigma The std of the Gaussian Distribution.
     */
    constructor(mu, sigma) {
      /** @private */ this.mu = mu
      /** @private */ this.sigma = sigma
    }
  
    /**
     * Creates a new Gaussian Distribution from a mean and variance.
     *
     * @param {number} mu The mean of the Gaussian Distribution.
     * @param {number} variance The variance of the Gaussian Distribution.
     * @return {GaussianDistribution} The new GaussianDistribution object.
     */
    static fromVariance(mu, variance) {
      return new GaussianDistribution(mu, Math.sqrt(variance))
    }
  
    /**
     * Find a String representation of the Gaussian Distribution.
     *
     * @override
     * @return {string} Human-readable representation of this Gaussian Distribution.
     */
    toString() {
      return `[A Gaussian Distribution object with mu = ${this.mu} and sigma = ${this.sigma}.]`
    }


    /**
     * Find the value of PDF of the Gaussian Distribution.
     *
     * @param {number} x The point where PDF value of the Gaussian Distribution is needed.
     * @return {number} The PDF value at given point `x` of the Gaussian Distribution.
     */
    pdf(x) {
        let coefficient = 1 / (this.sigma * Math.sqrt(2 * Math.PI))
        return coefficient * Math.exp(
            (-1/2) * 
            Math.pow(
                (x - this.mu)/(this.sigma), 2
                )
            )
      }


    /**
     * Find the x,y points of PDF of the Gaussian Distribution.
     *
     * @param {number} x_min The minimum limit of x point to calculate PDF of the Gaussian Distribution.
     * @param {number} x_min The maximum limit of x point to calculate PDF of the Gaussian Distribution.
     * @param {number} n_points The number of points to generate the x,y values for the Gaussian Distribution.
     * 
     * @return {Array} The Array of x and PDF(x) values of Gaussian Distribution.
     */
    pdfPoints(x_min, x_max, n_points=10, output_type="list_of_lists") {
        const step = (x_max - x_min) / (n_points - 1);
        const xs = range(x_min, x_max + step, step);
        const ys = xs.map((x) => (this.pdf(x)));
        if (output_type == "list_of_lists" || output_type=="[[xs],[ys]]") {
          return [
              xs,
              ys
          ];
        }
        else if (output_type == "list_of_objects" || output_type=="[{x,y}s]"){
          const data = xs.map((d, i) => {
             return {x: d} 
            });
          data.forEach((d,i)=> d.y = ys[i]);
          return data;
        };

      }

    /**
     * Returns the Latex formula of Gaussian Distribution PDF.
     * 
     * @return {string} The string representation of Latex expression.
     */
    pdfGeneralFormulaToLatex() {
        return `{{\\frac {1}{\\sigma {\\sqrt {2\\pi }}}}e^{-{\\frac {1}{2}}\\left({\\frac {x-\\mu }{\\sigma }}\\right)^{2}}}`
    }


    /**
     * TODO: complete
     * Returns the plot to add for svg element
     * 
     * @param {number} x_min The minimum limit of x point to calculate PDF of the Gaussian Distribution.
     * @param {number} x_min The maximum limit of x point to calculate PDF of the Gaussian Distribution.
     * @param {number} n_points The number of points to generate the x,y values for the Gaussian Distribution.
     * 
     * 
     * @return {string} The string representation of Latex expression.
     */
    pdfPlot(
      svgElementId="svg",
      x_min=-1,
      x_max=1,
      n_points=5,
      x_scale=100,
      y_scale=200,
      color="blue",
      fill="none",
      right_closed=false,
      left_closed=false,
      ) {
      // get the element
      const svg = select(`svg#${svgElementId}`);
      // simulate the data
      const dataArray = this.pdfPoints(x_min, x_max, n_points, "[{x,y}s]");
      // add the right and left vertical lines if specified
      if (right_closed){
        dataArray.push({x: dataArray[dataArray.length-1].x, y:0})
      }
      if (left_closed){
        dataArray.unshift({x: dataArray[0].x, y:0})
      }
      // log the data
      console.log("dataArray", dataArray);
      // find height of the array
      const height = max(dataArray, (d,i) => d.y);

      // line generator
      const lineGenerator = line()
                            .x( (d,i) => (d.x - x_min) * x_scale)
                            .y( (d,i) => (height*1.01 - d.y)*y_scale);
      // add the path 
      svg.append("path")
        .attr("fill", fill)
        .attr("stroke", color)
        .attr("d", lineGenerator(dataArray));

      return "OK"

    }    
    
  }

  export default GaussianDistribution;
import { arraysAreEqual } from '../../utils'


export function pointInsideSegment(point, segment, threshold = 2) {
    const [x, y] = point;
    const [[x1, y1], [x2, y2]] = segment;
    if (
        (x >= Math.min(x1, x2) - threshold && x <= Math.max(x1, x2) + threshold) &&
        (y >= Math.min(y1, y2) - threshold && y <= Math.max(y1, y2) + threshold)
    ) {
        const distance = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
        return distance <= threshold;
    }

    return false;
}

export function pointOnLine(point, line, epsilon = 0) {
    const L = lineLength(line);
    const lenToStart = lineLength([line[0], point]);
    const lenToEnd = lineLength([line[1], point]);
    return pointWithLine(point, line, epsilon) && lenToStart <= L && lenToEnd <= L;
}

export function lineLength(line) {
    const dx = line[1][0] - line[0][0];
    const dy = line[1][1] - line[0][1];
    return Math.sqrt(dx * dx + dy * dy);
}

export function cross(a, b, o) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

export function pointWithLine(point, line, epsilon = 0) {
    return Math.abs(cross(point, line[0], line[1])) <= epsilon;
}

export function lineIntersectsLine(lineA, lineB) {
    const [[a0x, a0y], [a1x, a1y]] = lineA,
        [[b0x, b0y], [b1x, b1y]] = lineB;

    // Test for shared points
    if (a0x === b0x && a0y === b0y) return true;
    if (a1x === b1x && a1y === b1y) return true;

    // Test for point on line
    if (pointOnLine(lineA[0], lineB) || pointOnLine(lineA[1], lineB)) return true;
    if (pointOnLine(lineB[0], lineA) || pointOnLine(lineB[1], lineA)) return true;

    const denom = ((b1y - b0y) * (a1x - a0x)) - ((b1x - b0x) * (a1y - a0y));

    if (denom === 0) return false;

    const deltaY = a0y - b0y,
        deltaX = a0x - b0x,
        numer0 = ((b1x - b0x) * deltaY) - ((b1y - b0y) * deltaX),
        numer1 = ((a1x - a0x) * deltaY) - ((a1y - a0y) * deltaX),
        quotA = numer0 / denom,
        quotB = numer1 / denom;

    return quotA > 0 && quotA < 1 && quotB > 0 && quotB < 1;

}

export function rectangleEdges(rect) {
    const rx = rect.x();
    const ry = rect.y();
    const rw = rect.width();
    const rh = rect.height();

    return [
        [[rx, ry], [rx + rw, ry]],           // Top edge
        [[rx + rw, ry], [rx + rw, ry + rh]], // Right edge
        [[rx, ry + rh], [rx + rw, ry + rh]], // Bottom edge
        [[rx, ry], [rx, ry + rh]]            // Left edge
    ];
}

export function lineIntersectsRect(line, rectEdges) {
    return rectEdges.some(rectEdge => lineIntersectsLine(line, rectEdge));
}

export function polylineSegments(polyline) {
    const points = polyline.array()
    const segments:any = [];
    for (let i = 0; i < points.length - 1; i++) {
        segments.push([points[i], points[i + 1]]);
    }
    return segments;
}

export function polylineIntersectsRect(polyline, rect) {
    const polySegments = polylineSegments(polyline);
    const rectEdges = rectangleEdges(rect);

    for (let i = 0; i < polySegments.length; i++) {
        if (lineIntersectsRect(polySegments[i], rectEdges)) {
            return true;
        }
    }

    return false;
}

export function polylineIsInsideRect(polyline, rect) {
    const points = polyline.array();
    const rectBounds = getRectangleBounds(rect);
    for (let i = 0; i < points.length; i++) {
        if (!pointIsInsideRect(points[i], rectBounds)) {
            return false;
        }
    }
    return true;
}

export function getRectangleBounds(rect) {
    return {
        x1: rect.x(),
        y1: rect.y(),
        x2: rect.x() + rect.width(),
        y2: rect.y() + rect.height()
    };
}

export function pointIsInsideRect(point, bounds) {
    return point[0] >= bounds.x1 && point[0] <= bounds.x2 &&
           point[1] >= bounds.y1 && point[1] <= bounds.y2;
}

export function handlePolylineMouse(pos, polyline) {
    const clickPoint = [pos.x, pos.y];
    const polySegments = polylineSegments(polyline);
    for (let i = 0; i < polySegments.length; i++) {
        const segment = polySegments[i];
        if (pointInsideSegment(clickPoint, segment, 10)) {
            return segment;
        }
    }
    return false;
}

export function isVertical(segment) {
    let [point1, point2] = segment
    return point1[0] === point2[0];
}

export function getSegmentIndex(segment, polyline) {
    const polySegments = polylineSegments(polyline);
    for (let i = 0; i < polySegments.length; i++) {
        if (arraysAreEqual(polySegments[i], segment)) {
            return i;
        }
    }
    return -1;
}

export function removePointsBetweenSegments(points) {

    for (let i = 0; i < points.length - 2; i++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];
        const [x3, y3] = points[i + 2];

        if ((x2 - x1) * (y3 - y1) === (x3 - x1) * (y2 - y1)) {
            points.splice(i + 1, 1);
            i--;
        }
    }

    return points;
}

export function removeDuplicatePoints(points) {
    const uniquePoints: any = [];
    points.forEach((p: any) => {
        if (!uniquePoints.some((up) => up[0] === p[0] && up[1] === p[1])) {
            uniquePoints.push(p);
        }
    });
    return uniquePoints;
}

export function midpoint(p1, p2) {
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}

export function getMinMaxPoints(points) {
    const minX = Math.min(...points.map(p => p[0]));
    const minY = Math.min(...points.map(p => p[1]));
    const maxX = Math.max(...points.map(p => p[0]));
    const maxY = Math.max(...points.map(p => p[1]));
    return [minX, minY, maxX, maxY];
}
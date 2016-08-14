public class squaretriangle{
	public static void squareNumbers(double limit){
		int found = 0;
		double count = 1;
		double count_squared = (count*count);
		while(true){
			if(found == limit){
				break;
			}
			for(double i = 0; i < Math.round(count_squared/2); i++){
				double tri = ((i*(i+1))/2);
				if(count_squared == tri){
					System.out.println(String.format("%d; m= %d, n= %d",count_squared,count,i));
					found++;
				}else{
					continue;
				}
			}
			count++;
		}
	}
	
	public static void main(String args[]){
		squareNumbers(50);
	}
}
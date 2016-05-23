<div class="" ng-include="'view/header-interno.html'"></div>
<div class="" ng-include="'js/chamados/view/chat-box.html'"></div>

<div layout="row" layout-align="center center">
	<md-content flex-gt-sm="80" layout-fill layout="column"
		class="bbot_v002" id="area-bbot">


	<div  id="card-meta" layout-padding>

		<md-card   ng-repeat="(i, meta) in metaList | filter: buscar  | orderBy: '-create_at' "  ng-class=" (i == 0) ? '' : 'disabled' "  >  
			<h1>{{meta.nome}} <span ng-show="i == 0" > - Ativo</span></h1>
<!--             <p class="detalhe">{{meta.data| date:'dd/MM/yyyy' }}</p> -->
			<md-progress-linear class="linha"  md-mode="determinate"
				value="{{meta.porcentagem}}"				
				></md-progress-linear> 
<!-- 			<p class="detalhe">{{meta.pq}}</p> -->


			<div layout="row" class="esquerda" ng-show="meta.tipo == 'Valor'">
			  <div flex="50">
				<p class="detalhe">{{ meta.total | currency:"R$":2}} | {{meta.porcentagem | number:2 }}%</p>
			  </div>
			  <div flex="50" class="direita">
				<p class="detalhe">{{ meta.quantidade | currency:"R$":2}}</p>
			  </div>
  
			</div>
			
			
			<div layout="row" class="esquerda" ng-show="meta.tipo == 'Unidade'">
			  <div flex="50">
				<p class="detalhe">{{meta.total}} {{meta.unidade}} | {{meta.porcentagem | number:2 }}%</p>
			  </div>
			  <div flex="50" class="direita">
				<p class="detalhe">{{meta.quantidade}} {{meta.unidade}}</p>
			  </div>
  
			</div>





			<div id="detalhes-meta">

				<hr/>

				<div layout="row" class="esquerda">
				  <div flex="50">
					<h2>Porque essa meta é importante?</h2>
					<p class="detalhe">{{meta.pq}}</p>
				  </div>
				  <div flex="50" class="direita">
					<h2>Data para alcance dessa meta</h2>
					<p class="detalhe">{{meta.data| date:'dd/MM/yyyy' }}</p>
				  </div>
	  
				</div>

				

				<h2>Situação atual:</h2>

				<p class="detalhe">{{meta.porcentagem | number:2 }}%</p>

				<div ng-show="meta.tipo == 'Valor'">
					<p class="detalhe">{{ meta.total | currency:"R$":2}} / {{ meta.quantidade | currency:"R$":2}}</p>
				</div>
				<div ng-show="meta.tipo == 'Unidade'">
					<p class="detalhe">{{meta.total}} / {{meta.quantidade}} {{meta.unidade}}</p>
				</div>


				<h2>Sucessos que contribuiram para essa meta</h2>


			<div class="md-whiteframe-1dp" layout-padding>
				<div layout="row" layout-wrap>
					<div flex>
						<md-icon md-font-library="material-icons">work</md-icon>
						Projeto
					</div>
					<div flex="15">
						<md-icon md-font-library="material-icons">monetization_on</md-icon>
						Valor
					</div>
					<div flex="20">
						<md-icon md-font-library="material-icons">person</md-icon>
						Contato
					</div>
					
					<div flex="15">
						<md-icon md-font-library="material-icons">event</md-icon>
						Fechado em
					</div>
					
				</div>

			</div>


		<div class="md-whiteframe-1dp" layout-padding
			ng-repeat="lead in meta.sucesso">
			<div layout="row" layout-wrap>
				<div flex>{{lead.projeto}}</div>
				<div flex="15">{{ (!lead.valor) ? 0 : lead.valor |
					currency:"R$":2}}</div>
				<div flex="20">{{lead.contato}}</div>
				
				<div flex="15">{{lead.close_at| date:'dd/MM/yyyy' }}</div>
				
			</div>

		</div>




			</div>	
				
		</md-card>
	</div>









	</md-content>
</div>




